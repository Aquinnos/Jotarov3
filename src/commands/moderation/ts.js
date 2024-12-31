const {
    PermissionFlagsBits,
} = require('discord.js');

module.exports = {  
    callback: async (client, interaction) => {
        const channel = interaction.guild.channels.cache.get(interaction.channelId);
        const role = interaction.guild.roles.cache.get('');
        
        if (!channel) {
            await interaction.reply('Nie znaleziono kanału');
            return;
        }
        
        if (!role) {
            await interaction.reply('Nie znaleziono roli');
            return;
        }

        await channel.permissionOverwrites.edit(role, {
            [PermissionFlagsBits.SendMessages]: false,
        });

        await channel.send('STAR PLATINIUM OVER HEAVEN!');

        setTimeout(async () => {
            await channel.permissionOverwrites.edit(role, {
                [PermissionFlagsBits.SendMessages]: true,
            });

            await channel.send('Czas ruszył ponownie');
        }, 8000);
    },
    
    name: 'ts',
    description: 'Zatrzymuje czas na 8s',
    options: [],
    
    permissionsRequired: [PermissionFlagsBits.MuteMembers],
    botPermissions: [PermissionFlagsBits.MuteMembers],
};