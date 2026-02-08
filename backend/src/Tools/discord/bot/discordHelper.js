import { client } from "./bot.js";

export async function getChannelMessages(channelId, limit = 50) {
  try {
    const channel = await client.channels.fetch(channelId);
    if (!channel || !channel.isTextBased()) return [];

    const messages = await channel.messages.fetch({ limit });
    return messages.map((msg) => ({
      id: msg.id,
      author: msg.author.username,
      content: msg.content,
      timestamp: msg.createdAt,
    }));
  } catch (err) {
    console.error("Error fetching messages:", err);
    return [];
  }
}
