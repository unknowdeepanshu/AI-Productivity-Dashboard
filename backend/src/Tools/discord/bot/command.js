import { REST, Routes, SlashCommandBuilder } from "discord.js";

export async function registerCommands() {
  const commands = [
    new SlashCommandBuilder()
      .setName("ping")
      .setDescription("Ping a user")
      .addUserOption((option) =>
        option
          .setName("user")
          .setDescription("Select a user")
          .setRequired(true),
      )
      .toJSON(),
    new SlashCommandBuilder()
      .setName("connect")
      .setDescription("Connect a user get server data")
      .addUserOption((option) =>
        option
          .setName("user")
          .setDescription("Select a user")
          .setRequired(true),
      )
      .toJSON(),
    new SlashCommandBuilder()
      .setName("remove")
      .setDescription("Remove a user get server data")
      .addUserOption((option) =>
        option
          .setName("user")
          .setDescription("Select a user")
          .setRequired(true),
      )
      .toJSON(),
    new SlashCommandBuilder()
      .setName("listusers")
      .setDescription("List all users with server data")
      .toJSON(),
  ];

  const rest = new REST({ version: "10" }).setToken(
    process.env.DISCORD_BOT_TOKEN,
  );

  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error("this error:", error);
  }
}
