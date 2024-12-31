const {
    PermissionFlagsBits,
    ApplicationCommandOptionType,
} = require('discord.js');

module.exports = {
    callback: async (client, interaction) => {
        const { options } = interaction;

        const amount = options.getInteger('ilość');

        if (amount < 1 || amount > 100) {
            await interaction.reply('Ilość wiadomości musi być liczbą od 1 do 100');
            return;
        }

        await interaction.channel.bulkDelete(amount);

        await interaction.reply('Rzeczywistość została nadpisana');
    },
    
    name: 'ro',
    description: 'Usuwa podaną ilość wiadomości z kanału',
    options: [
        {
            name: 'ilość',
            description: 'Ilość wiadomości do usunięcia',
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
    ],
    
    permissionsRequired: [PermissionFlagsBits.ManageMessages],
    botPermissions: [PermissionFlagsBits.ManageMessages],
};