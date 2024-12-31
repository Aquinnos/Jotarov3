// /zoo <nick> - wysyła użytkownika do zoo
// wytłumaczenie: komenda wysyła podanego użytkownika do kanału zoo id: 1253051956193394820
// zabiera mu wszystkie role i nadaje mu role o id: 1253032430219034694


module.exports = {
    callback: async (client, interaction) => {
        const member = interaction.options.get('target-user').member;
        const channel = interaction.guild.channels.cache.get('1253051956193394820');
        const role = interaction.guild.roles.cache.get('1253032430219034694'); 
        
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