const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client({
    intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES']
});

const token = process.env.token;
const clientId = process.env.client_id;
const guildId = process.env.guild_id;
const ownerId = process.env.owner_id;

let bot = {
    client
};

client.slashcommands = new Discord.Collection();

client.loadSlashCommands = (bot, reload) => require('./handlers/slashcommands')(bot, reload);

client.loadSlashCommands(bot, false);

client.on('ready', async () => {
    const guild = client.guilds.cache.get(guildId);
    if (!guild) return console.error('Target guild not found');

    await guild.commands.set([...client.slashcommands.values()]);
    console.log(`Successfully loaded in ${client.slashcommands.size}`);
    process.exit(0);
});

client.login(token);
