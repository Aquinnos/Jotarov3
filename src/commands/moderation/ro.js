// /ro <ilość wiadomości> - Reality Overwrite (Usuwa podaną ilosc wiadomosci z kanalu)
// wytłumaczenie:
// /*
// Ma działać tak, że po wpisaniu komendy /ro bot usuwa podaną ilość wiadomości z kanału, który jest aktualnie używany. 
// I po zrobieniu tego moze napisać bot: "Rzeczywistość została nadpisana"
// */

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