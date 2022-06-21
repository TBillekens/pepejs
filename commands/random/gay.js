module.exports = {
    name: 'gay',
    category: 'random',
    permissions: [],
    devOnly: false,
    run: async ({ client, message, args }) => {
        const arr = ['Bas is kinda sussy Owo', 'Niels is a sussy baka for sure Ong', 'Timmy is a cool guy'];
        message.reply(arr[Math.floor(Math.random() * arr.length)]);
    }
};
