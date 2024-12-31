module.exports = (client) => {
  client.on('messageCreate', async (message) => {
    if (message.author.bot) return; 

    const inviteRegex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/\w+/g;

    if (inviteRegex.test(message.content)) {
      message.delete();
      message.reply('Reklamowanie innych serwerów jest zabronione. Zostałeś zmutowany na 7 sekund.');

      const role = message.guild.roles.cache.get(''); 
      if (!role) {
        console.error('Nie znaleziono roli o ID: ');
        return;
      }

      // Zabrać wszystkie bieżące role użytkownika
      const memberRoles = message.member.roles.cache;
      memberRoles.forEach(r => {
        if (r.id !== role.id) {
          message.member.roles.remove(r).catch(error => {
            console.error('Wystąpił błąd podczas usuwania roli:', error);
          });
        }
      });

      message.member.roles.add(role).catch(error => {
        console.error('Wystąpił błąd podczas dodawania roli:', error);
      });
    }
  });
};