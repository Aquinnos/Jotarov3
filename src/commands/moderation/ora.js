const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'ora',
    description: 'Wykonuje sekwencję cutscenki i banuje użytkownika',
    options: [
        {
            name: 'target-user',
            description: 'Użytkownik do zbanowania',
            type: 6, 
            required: true,
        },
    ],

    permissionsRequired: [PermissionFlagsBits.BanMembers],
    botPermissions: [PermissionFlagsBits.BanMembers],

    callback: async (client, interaction) => {
        const targetUserId = interaction.options.get('target-user').value; 
        const channel = interaction.guild.channels.cache.get(interaction.channelId);
        const role = interaction.guild.roles.cache.get('1252860760841912443');
    
        await interaction.deferReply();
    
        const targetUser = await interaction.guild.members.fetch(targetUserId);
    
        if (!targetUser) {
            await interaction.editReply("Nie można znaleźć tego użytkownika.");
            return;
        }
    
        if (targetUser.id === interaction.guild.ownerId) {
            await interaction.editReply(
            "Nie możesz zbanować właściciela serwera."
            );
            return;
        }
    
        const targetUserRolePosition = targetUser.roles.highest.position; // Highest role of the target user
        const requestUserRolePosition = interaction.member.roles.highest.position; // Highest role of the user running the cmd
        const botRolePosition = interaction.guild.members.me.roles.highest.position; // Highest role of the bot
    
        if (targetUserRolePosition >= requestUserRolePosition) {
            await interaction.editReply(
            "Nie możesz zbanować tego użytkownika, ponieważ ma taką samą lub wyższą rolę niż ty."
            );
            return;
        }
    
        if (targetUserRolePosition >= botRolePosition) {
            await interaction.editReply(
            "Nie mogę zbanować tego użytkownika, ponieważ ma taką samą lub wyższą rolę niż ja."
            );
            return;
        }
        
        try {
            await interaction.editReply('STAR PLATINIUM OVER HEAVEN!');
            
            setTimeout(async () => {
                await channel.send('Czas się zatrzymał…');
                await channel.permissionOverwrites.edit(role, {
                    [PermissionFlagsBits.SendMessages]: false,
                });

                setTimeout(async () => {
                    await channel.send('Yare yare daze…');

                    setTimeout(async () => {
                        await channel.send('ORAAAAAAAA');

                        setTimeout(async () => {
                            await channel.send('ORA ORA ORA ORA ORA ORA ORA ORA ORA ORA');

                            setTimeout(async () => {
                                await channel.send('Czas nadpisać rzeczywistość!');

                                setTimeout(async () => {
                                    await channel.send('ORAAAAA!');

                                    setTimeout(async () => {
                                        await channel.send('Zostałeś wymazany, czas ruszył ponownie.');
                                        await channel.permissionOverwrites.edit(role, {
                                            [PermissionFlagsBits.SendMessages]: true,
                                        });
                                        await targetUser.ban({ reason: 'Zostałeś wymazany, czas ruszył ponownie.' });
                                    }, 2000);
                                }, 2000);
                            }, 2000);
                        }, 2000);
                    }, 2000);
                }, 2000);
            }, 2000);
        } catch (error) {
            console.error('Wystąpił błąd:', error);
            await interaction.followUp('Wystąpił błąd podczas wykonywania komendy.');
        }
    },
};