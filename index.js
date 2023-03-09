const dotenv = require("dotenv");
const fs = require("fs");
const { Client, GatewayIntentBits, Collection } = require("discord.js");

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});
client.commands = new Collection();
client.commandArray = [];

const handlerFolders = fs.readdirSync(`./src/handlers`);
for (const folder of handlerFolders) {
  const handlerFiles = fs
    .readdirSync(`./src/handlers/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of handlerFiles)
    require(`./src/handlers/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();

client.login(process.env.TOKEN);
