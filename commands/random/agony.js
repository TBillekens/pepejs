module.exports = {
    name: 'agony',
    category: 'random',
    permissions: [],
    devOnly: false,
    run: async ({ client, message, args, bot }) => {
        const { tenorKey } = bot;
        const url = `https://api.tenor.com/v1/search?q=${message}&key=${tenorKey}&limit=10`;
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
    }
};
