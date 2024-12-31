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
      await interaction.editReply("Ten użytkownik nie istnieje.");
      return;
    }

    if (targetUser.id === interaction.guild.ownerId) {
      await interaction.editReply(
        "Nie możesz wyrzucić właściciela serwera."
      );
      return;
    }

    const targetUserRolePosition = targetUser.roles.highest.position; 
    const requestUserRolePosition = interaction.member.roles.highest.position; 
    const botRolePosition = interaction.guild.members.me.roles.highest.position;

    if (targetUserRolePosition >= requestUserRolePosition) {
      await interaction.editReply(
        "Nie możesz wyrzucić tego użytkownika, ponieważ ma taką samą lub wyższą rolę niż ty."
      );
      return;
    }

    if (targetUserRolePosition >= botRolePosition) {
      await interaction.editReply(
        "Nie mogę wyrzucić tego użytkownika, ponieważ ma taką samą lub wyższą rolę niż ja."
      );
      return;
    }

    try {
      await targetUser.kick({ reason });
      await interaction.editReply(
        `Użytkownik ${targetUser} został wyrzucony\nPowód: ${reason}`
      );
    } catch (error) {
      console.log(`There was an error when kicking: ${error}`);
    }
  },

  name: 'kick',
  description: 'Wyrzuca użytkownika z serwera',
  options: [
    {
      name: 'target-user',
      description: 'The user you want to kick.',
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
    {
      name: 'reason',
      description: 'The reason you want to kick.',
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.KickMembers],
  botPermissions: [PermissionFlagsBits.KickMembers],
};
