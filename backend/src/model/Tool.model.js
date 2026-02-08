import mongoose from "mongoose";

const { Schema } = mongoose;

/* ---------------- SERVER ACCESS LIST ---------------- */

const ServerAccessSchema = new Schema({
  serverId: {
    type: String,
  },
  serverName: String,
  channels: [
    {
      channelId: String,
      channelName: String,
    },
  ],

  // users allowed to read history / data from bot
  accessUsers: [
    {
      discordUserId: String,
      username: String,
    },
  ],
});
const ChannelSchema = new mongoose.Schema({
  id: String,
  name: String,
});

const ServerSchema = new mongoose.Schema({
  guildId: String,
  guildName: String,
  channels: [ChannelSchema],
});

/* ---------------- TOOL SCHEMA ---------------- */

const ToolSchema = new Schema({
  toolName: {
    type: String, // discord, slack, github etc
    required: true,
  },
  username: String,
  id: String,

  accessToken: {
    token: String,
    expiresAt: String,
  },
  /* Servers user OWNS */
  ownedServers: [ServerAccessSchema],

  /* Servers user only has access */
  otherServers: {
    type: [ServerSchema],
    default: [],
  },
});

/* ---------------- USER SCHEMA ---------------- */

// const UserSchema = new Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     avatar: String,

//     authProvider: {
//       type: String, // google, github etc
//     },

//     tools: [ToolSchema],
//   },
//   { timestamps: true },
// );

export const Tools = mongoose.model("Tools", ToolSchema);
