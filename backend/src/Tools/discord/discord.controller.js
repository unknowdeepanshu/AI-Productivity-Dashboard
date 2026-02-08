import axios from "axios";
import { Tools } from "../../model/user.model.js";
import { getChannelMessages } from "./bot/discordHelper.js";

// this discord auth get into username
export async function discordAuthRedirect(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.send("No code provided");
  }

  const tokenStore = {
    access_token: null,
    expires_at: null,
  };

  function isTokenValid() {
    if (!tokenStore.access_token || !tokenStore.expires_at) {
      return false;
    }
    return Date.now() < tokenStore.expires_at;
  }
  console.log("Authorization code received:", code);
  try {
    // Exchange code → access token
    const tokenResponse = await axios.post(
      "https://discord.com/api/oauth2/token",
      new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: "http://localhost:8000/discord/auth",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );
    console.log("Token response data:", tokenResponse.data);
    const { access_token, expires_in, token_type } = tokenResponse.data;

    const response = await fetch("https://discord.com/api/v10/users/@me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const user = await response.json();

    console.log("Access token received:", tokenResponse);
    await Tools.create({
      toolName: "discord",
      username: user.username,
      id: user.id,
      accessToken: {
        token: access_token,
        expiresAt: Date.now() + expires_in * 1000,
      },
      ownedServers: [],
      otherServers: [],
    });
    // STORE TOKEN (no refresh token)
    tokenStore.access_token = access_token;
    tokenStore.expires_at = Date.now() + expires_in * 1000;

    res.json({
      message: "Discord connected successfully ✅",
      access_token,
      token_type,
      expires_in,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send("Discord OAuth failed");
  }
}

// this is function use for get user server and channels
export async function getUserServerChannels(req, res) {
  const { DB_ID } = req.params;
  const tool = await Tools.findById(DB_ID);

  if (!tool) {
    return res.status(401).json({
      error: "Access token expired or missing. Re-authorize required.",
    });
  }

  try {
    // Get user server using oauth
    const guildsRes = await axios.get(
      "https://discord.com/api/users/@me/guilds",
      {
        headers: {
          Authorization: `Bearer ${tool.accessToken.token}`,
        },
      },
    );

    const ownerGuilds = guildsRes.data.filter((guild) => guild.owner);

    // this use for get channels from user owned server
    const result = await Promise.all(
      ownerGuilds.map(async (guild) => {
        try {
          const channelsRes = await axios.get(
            `https://discord.com/api/v10/guilds/${guild.id}/channels`,
            {
              headers: {
                Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
              },
            },
          );

          return {
            guildId: guild.id,
            guildName: guild.name,
            guildOwner: guild.owner,
            channels: channelsRes.data.filter((ch) => ch.type === 0),
          };
        } catch (err) {
          return {
            guildId: guild.id,
            guildName: guild.name,
            guildOwner: guild.owner,
            channels: [],
            error: "Bot has no access to this guild",
          };
        }
      }),
    );
    res.json(result);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send("Failed to fetch orgs and channels");
  }
}

// this is function use to get message history from channels
export async function getChannelsMessages(req, res) {
  const { channelId } = req.params;
  const messages = await getChannelMessages(channelId, 100);
  res.json({ channelId, count: messages.length, messages });
}
