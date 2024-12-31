module.exports = {
    callback: async (client, interaction) => {
        const member = interaction.options.get('target-user').member;
        const channel = interaction.guild.channels.cache.get('');
        const role = interaction.guild.roles.cache.get(''); 
        
        if (!member) {
            await interaction.reply('Nie znaleziono użytkownika');
            return;
        }
        
        if (!channel) {
            await interaction.reply('Nie znaleziono kanału');
            return;
        }
        
        if (!role) {
            await interaction.reply('Nie znaleziono roli');
            return;
        }

        await member.roles.set([role]);

        await interaction.reply(`Zapraszamy do ZOO ${member} `);
    },
    
    name: 'zoo',
    description: 'Wysyła użytkownika do zoo',
    options: [
        {
            name: 'target-user',
            description: 'Użytkownik, który ma zostać wysłany do zoo',
            type: 6,
            required: true,
        },
    ],
};