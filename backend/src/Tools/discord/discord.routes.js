import express from "express";
import {
  discordAuthRedirect,
  getUserServerChannels,
  getChannelsMessages,
} from "./discord.controller.js";

const router = express.Router();

router.get("/discord/auth", discordAuthRedirect);
router.get("/discord/own/server/:DB_ID", getUserServerChannels);
router.get("/discord/servers/messages/:channelId", getChannelsMessages);
export default router;
