const durations = [
    { name: '60 seconds', value: 60 * 1000 },
    { name: '5 minutes', value: 5 * 60 * 1000 },
    { name: '10 minutes', value: 10 * 60 * 1000 },
    { name: '15 minutes', value: 15 * 60 * 1000 },
    { name: '30 minutes', value: 30 * 60 * 1000 },
    { name: '1 hour', value: 60 * 60 * 1000 },
    { name: '1 day', value: 24 * 60 * 60 * 1000 },
    { name: '1 week', value: 7 * 24 * 60 * 60 * 1000 }
];
const run = async (client, interaction) => {
    const member = interaction.options.getMember('user');
    const duration = interaction.options.getNumber('duration');
    const reason = interaction.options.getString('reason') || 'No reason given.';

    if (!member) return interaction.reply('You must specify a user.');

    try {
        await member.timeout(duration, reason);
        return interaction.reply(`Successfully timed out ${member.user.tag} for ${duration.find((d) => duration === d.value)?.name} with a reason of ${reason}.`);
    } catch (err) {
        if (err) {
            return interaction.reply(`Failed to time out ${member.user.tag} for ${duration.find((d) => duration === d.value)?.name} with a reason of ${reason}.`);
        }
    }
};

module.exports = {
    name: 'timeout',
    description: 'Timeout a user for a specified amount of time.',
    perm: 'MODERATE_MEMBERS',
    options: [
        {
            name: 'user',
            description: 'The user to timeout.',
            type: 'USER',
            required: true
        },
        {
            name: 'duration',
            description: 'The amount of time to timeout the user for.',
            type: 'NUMBER',
            choices: durations,
            required: true
        },
        {
            name: 'reason',
            description: 'The reason for the timeout.',
            type: 'STRING',
            required: false
        }
    ]
};
