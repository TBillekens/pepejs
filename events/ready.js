module.exports = {
    name: 'ready',
    run: async (bot) => {
        const { client, prefix, owners, clientId, guildId } = bot;
        console.log(`Ready! ${bot.client.user.tag}`);

        // const guild = client.guilds.cache.get(guildId);
        // if (!guild) {
        //     return console.log('Guild not found.');
        // }
        //
        // await guild.commands.set([...client.slashcommands.values()]);
        // console.log(`Successfully loaded in ${guild.commands.size}`);
    }
};
