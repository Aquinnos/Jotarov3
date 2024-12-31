module.exports = {
    name: 'commands',
    description: 'Wyświetla dostępne komendy',
    callback: (client, interaction) => {
        const commands = client.commands.map(cmd => `\`${cmd.name}\`: ${cmd.description}`).join('\n');
        interaction.reply(`Dostępne komendy:\n${commands}`);
    },
};