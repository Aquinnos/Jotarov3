const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'top',
    description: 'Wyświetla top użytkowników z najwyższym poziomem mocy',
    callback: async (client, interaction) => {
        const filePath = path.join(__dirname, '../../../expData.json');
        const expData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const sortedUsers = Object.entries(expData).sort((a, b) => b[1] - a[1]);
        const emoji = '<:ssj:1318518595051065354>'; 
        const topUsers = await Promise.all(sortedUsers.slice(0, 10).map(async ([id, exp], index) => {
            const user = await client.users.fetch(id);
            return `${index + 1}. ${user.username}: ${exp}`;
        }));
        interaction.reply(`Top poziomów mocy ${emoji}:\n${topUsers.join('\n')}`);
    },
};