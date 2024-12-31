const {
    PermissionFlagsBits,
} = require('discord.js');

// wytłumaczenie:
/*
Ma działać tak, że po wpisaniu komendy /ts bot zatrzymuje "czas" czyli wyłącza możliwość
pisania na tym danym czacie na czas 8s dla wszystkich użytkowników o roli: 1252860760841912443 (czyli musisz pobrac id kanału, i masz odebrac role jemu role uzytkownka) I po wpisaniu komendy bot pisze: "Czas zatrzymany",
a po 8s bot pisze: "Czas wznowiony". Zabierz uprawnienia tylko do wysyłania wiadomosci a nie wszysktie uprawnienia. ty masz pobrac id kanału a nie ze ja mam ci dać, ale id roli usera masz u góry
Nie podawaj powodu
*/
module.exports = {  
    callback: async (client, interaction) => {
        const channel = interaction.guild.channels.cache.get(interaction.channelId);
        const role = interaction.guild.roles.cache.get('1252860760841912443');
        
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