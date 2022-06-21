const { getFiles } = require('../utils/functions');

module.exports = (bot, reload) => {
    const { client } = bot;

    let events = getFiles('./events/', '.js');

    if (events.length === 0) {
        console.log('No events found.');
    }

    events.forEach((f, i) => {
        console.log(`Loading event ${i + 1}/${events.length}: ${f}`);
        if (reload) {
            delete require.cache[require.resolve(`../events/${f}`)];
        }
        const event = require(`../events/${f}`);
        client.events.set(event.name, event);

        if (!reload) {
            console.log(`${i + 1}. ${f} loaded.`);
        }
    });

    if (!reload) {
        initEvents(bot);
    }
};

function triggerEventHandler(bot, event, ...args) {
    const { client } = bot;

    try {
        if (client.events.has(event)) {
            client.events.get(event).run(bot, ...args);
        } else {
            throw new Error(`Event ${event} not found.`);
        }
    } catch (err) {
        console.log(err);
    }
}

function initEvents(bot) {
    const { client } = bot;

    client.on('ready', () => {
        console.log('ready', 'console');
        triggerEventHandler(bot, 'ready');
    });

    client.on('messageCreate', (message) => {
        triggerEventHandler(bot, 'messageCreate', message);
    });
}
