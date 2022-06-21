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
    client,
    prefix: '!',
    owners: [ownerId],
    clientId,
    guildId
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
    if (!interaction.inGuild()) return interaction.reply('This command can only be used in a server.');

    const slashcmd = client.slashcommands.get(interaction.commandName);

    if (!slashcmd) return interaction.reply('This command does not exist.');

    if (slashcmd.perms && !interaction.member.permissions.has(slashcmd.perms)) return interaction.reply('You do not have the required permissions.');

    slashcmd.run(client, interaction);
});

console.log('testing');

module.exports = bot;

client.login(token);

// const prefix = '!';
//
//
// client.once('ready', () => {
//     console.log(`Ready! ${client.user.tag}`);
// });
//
// client.on('messageCreate', (message) => {
//     if (!message.content.startsWith(prefix) || message.author.bot) return;
//
//     const args = message.content.slice(prefix.length).split(/ +/);
//     const command = args.shift().toLowerCase();
//
//     if (command === 'ping') {
//         message.channel.send('Pong!');
//     } else if (command === 'help') {
//         message.channel.send('Your mom is a bot.');
//     }
// });
//
// client.login(token);
