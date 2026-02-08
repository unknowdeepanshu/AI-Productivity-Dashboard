import {
  Client,
  PermissionsBitField,
  Events,
  GatewayIntentBits,
} from "discord.js";
import dotenv from "dotenv";
import { registerCommands } from "./command.js";
import { Tools } from "../../../model/user.model.js";
dotenv.config();

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // Access guilds
    GatewayIntentBits.GuildMessages, // Access messages
    GatewayIntentBits.MessageContent, // Access message content
  ],
});
client.on(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
  registerCommands();
});

// remove user command and ping commands
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  // /ping
  if (interaction.commandName === "ping") {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator,
      )
    ) {
      return interaction.reply({
        content: "❌ Admin only command",
        ephemeral: true,
      });
    }
    return interaction.reply("🏓 Pong!");
  }

  // /remove the user
  if (interaction.commandName === "remove") {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator,
      )
    ) {
      return interaction.reply({
        content: "❌ Admin only command",
        ephemeral: true,
      });
    } else {
      const targetUser = interaction.options.getUser("user");

      const guildsData = [];

      client.guilds.cache.forEach((guild) => {
        const channels = guild.channels.cache
          .filter((ch) => ch.type === 0 && ch.viewable)
          .map((ch) => ({
            id: ch.id,
            name: ch.name,
          }));

        guildsData.push({
          guildId: guild.id,
          guildName: guild.name,
          channels,
        });
      });
      try {
        const exists = await Tools.exists({
          "otherServers.guildId": guildsData[0].guildId,
        });

        if (!exists) {
          console.log("Server data already exists for this user.");
          await interaction.reply({
            content: `✅ Server & channel data already sent to  ${targetUser.username}`,
            ephemeral: true,
          });
        } else {
          await Tools.findOneAndUpdate(
            {
              username: targetUser.username,
            },
            {
              $pull: {
                otherServers: { guildId: guildsData[0].guildId },
              },
            },
            { new: true },
          );
          await interaction.reply({
            content: `✅ Remove  ${targetUser.username} from data access`,
            ephemeral: true,
          });
        }
      } catch (err) {
        console.error(err);
        await interaction.reply({
          content: "❌ Could not DM the user",
          ephemeral: true,
        });
      }
    }
  }
});
//connect command
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "connect") {
    const targetUser = interaction.options.getUser("user");
    // Admin check
    if (!interaction.memberPermissions.has("Administrator")) {
      return interaction.reply({
        content: "❌ Only admins can use this command",
        ephemeral: true,
      });
    }

    const guildsData = [];

    client.guilds.cache.forEach((guild) => {
      const channels = guild.channels.cache
        .filter((ch) => ch.type === 0 && ch.viewable)
        .map((ch) => ({
          id: ch.id,
          name: ch.name,
        }));

      guildsData.push({
        guildId: guild.id,
        guildName: guild.name,
        channels,
      });
    });

    // Send data to user DM
    try {
      const exists = await Tools.exists({
        "otherServers.guildId": guildsData[0].guildId,
      });

      if (exists) {
        console.log("Server data already exists for this user.");
        await interaction.reply({
          content: `✅ Server & channel data already sent to  ${targetUser.username}`,
          ephemeral: true,
        });
      } else {
        await Tools.findOneAndUpdate(
          {
            username: targetUser.username,
          },
          { $addToSet: { otherServers: guildsData } },
        );
        await interaction.reply({
          content: `✅ Server & channel data sent to  ${targetUser.username}`,
          ephemeral: true,
        });
      }
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: "❌ Could not DM the user",
        ephemeral: true,
      });
    }
  }
});

//List of all users have access of server command
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "listusers") {
    // Admin check
    if (!interaction.memberPermissions.has("Administrator")) {
      return interaction.reply({
        content: "❌ Only admins can use this command",
        ephemeral: true,
      });
    }

    const guildsData = [];

    client.guilds.cache.forEach((guild) => {
      const channels = guild.channels.cache
        .filter((ch) => ch.type === 0 && ch.viewable)
        .map((ch) => ({
          id: ch.id,
          name: ch.name,
        }));

      guildsData.push({
        guildId: guild.id,
        guildName: guild.name,
        channels,
      });
    });

    // Send data to user DM
    try {
      const users = await Tools.find(
        { "otherServers.guildId": guildsData[0].guildId },
        { username: 1, _id: 0 }, // projection: only username
      );
      console.log("Users with access:", users);
      if (users.length === 0) {
        return interaction.reply({
          content: "❌ No users have access to this server",
          ephemeral: true,
        });
      }

      const userList = users.map((u) => `• ${u.username}`).join("\n");

      await interaction.reply({
        content: `👥 **Users with access to this server:**\n${userList}`,
        ephemeral: true,
      });
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: "❌ Could not DM the user",
        ephemeral: true,
      });
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
