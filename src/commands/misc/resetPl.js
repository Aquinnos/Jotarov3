const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'resetpl',
    description: 'Resetuje poziom mocy wszystkim użytkownikom na serwerze',
    callback: async (client, interaction) => {
        client.resetPl();
        interaction.reply('Poziom mocy został zresetowany');
    },
};