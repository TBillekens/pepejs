const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client({
    intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES']
});

const token = process.env.token;
const clientId = process.env.client_id;
const guildId = process.env.guild_id;
const ownerId = process.env.owner_id;
const tenorKey = process.env.tenor_key;

let bot = {
    client,
    prefix: '!',
    owners: [ownerId],
    clientId,
    guildId,
    tenorKey
};

client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.slashcommands = new Discord.Collection();

client.loadEvents = (bot, reload) => require('./handlers/events')(bot, reload);
client.loadCommands = (bot, reload) => require('./handlers/commands')(bot, reload);
client.loadSlashcommands = (bot, reload) => require('./handlers/slashcommands')(bot, reload);

client.loadEvents(bot, false);
client.loadCommands(bot, false);
client.loadSlashcommands(bot, false);

client.on('interactionCreate', (interaction) => {
    if (!interaction.isCommand()) return;
    if (!interaction.inGuild()) return interaction.reply('This command can only be used in a server');

    const slashcmd = client.slashcommands.get(interaction.commandName);

    if (!slashcmd) return interaction.reply('Invalid slash command');

    if (slashcmd.perm && !interaction.member.permissions.has(slashcmd.perm)) return interaction.reply('You do not have permission for this command');

    slashcmd.run(client, interaction);
});

module.exports = bot;

client.login(token);
