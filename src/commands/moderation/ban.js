const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    PermissionFlagsBits,
  } = require('discord.js');
  
  module.exports = {
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */
  
    callback: async (client, interaction) => {
      const targetUserId = interaction.options.get('target-user').value;
      const reason =
        interaction.options.get('reason')?.value || 'Nie podano powodu'; 
  
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
  
      const targetUserRolePosition = targetUser.roles.highest.position; 
      const requestUserRolePosition = interaction.member.roles.highest.position; 
      const botRolePosition = interaction.guild.members.me.roles.highest.position; 
  
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
  
      // Ban the targetUser
      try {
        await targetUser.ban({ reason });
        await interaction.editReply(
          `Użytkownik ${targetUser} został zbanowany\nPowód: ${reason}`
        );
      } catch (error) {
        console.log(`There was an error when banning: ${error}`);
      }
    },
  
    name: 'ban',
    description: 'Banuje użytkownika z serwera',
    options: [
      {
        name: 'target-user',
        description: 'Użytkownik do zbanowania',
        type: ApplicationCommandOptionType.Mentionable,
        required: true,
      },
      {
        name: 'reason',
        description: 'Powód zbanowania',
        type: ApplicationCommandOptionType.String,
      },
    ],
    permissionsRequired: [PermissionFlagsBits.BanMembers],
    botPermissions: [PermissionFlagsBits.BanMembers],
  };
  