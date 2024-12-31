const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'pl',
    description: 'Pokazuje twój poziom mocy',
    callback: (client, interaction) => {
        const filePath = path.join(__dirname, '../../../expData.json');
        const expData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const userId = interaction.user.id;
        const userExp = expData[userId] || 0;
        const emoji = '<:ssj:1318518595051065354>'; 
        interaction.reply(`**Twój poziom mocy:** ${userExp} ${emoji}`);
    },
};