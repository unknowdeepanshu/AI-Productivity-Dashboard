import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";
// This is for discord routes
import discordRoutes from "./Tools/discord/discord.routes.js";
import { getChannelMessages } from "./Tools/discord/bot/discordHelper.js";
import "./Tools/discord/bot/bot.js";
// DB CONNECTOR
import { connectMongo } from "./db/mongoConnextor.js";
import { Tools } from "./model/user.model.js";
//this for github routes
import githubRoutes from "./Tools/github/github.routes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

connectMongo();
app.use(express.json());

app.use(cors());
app.use(githubRoutes);
app.use(discordRoutes);

// this for message history
app.post("/discord/messages", async (req, res) => {
  const { channelIds } = req.body;

  if (!Array.isArray(channelIds)) {
    return res.status(400).json({ error: "channelIds must be an array" });
  }

  const results = [];

  for (const id of channelIds) {
    const messages = await getChannelMessages(id, 100);
    results.push({
      channelId: id,
      count: messages.length,
      messages,
    });
  }

  res.json(results);
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
