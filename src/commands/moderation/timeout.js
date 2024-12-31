const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');
const ms = require('ms');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

  callback: async (client, interaction) => {
    const mentionable = interaction.options.get('target-user').value;
    const duration = interaction.options.get('duration').value; 
    const reason = interaction.options.get('reason')?.value || 'Brak podanego powodu';

    await interaction.deferReply();

    const targetUser = await interaction.guild.members.fetch(mentionable);
    if (!targetUser) {
      await interaction.editReply("Ten użytkownik nie jest już na serwerze");
      return;
    }

    if (targetUser.user.bot) {
      await interaction.editReply("Nie możesz zmutować bota");
      return;
    }

    const msDuration = ms(duration);
    if (isNaN(msDuration)) {
      await interaction.editReply('Nieprawidłowy format czasu. Przykłady: 1d, 1 day, 1s, 5s, 5m');
      return;
    }

    if (msDuration < 5000 || msDuration > 2.419e9) {
      await interaction.editReply('Czas trwania musi być między 5 sekund a 28 dni.');
      return;
    }

    const targetUserRolePosition = targetUser.roles.highest.position;
    const requestUserRolePosition = interaction.member.roles.highest.position;
    const botRolePosition = interaction.guild.members.me.roles.highest.position;

    if (targetUserRolePosition >= requestUserRolePosition) {
      await interaction.editReply("Nie możesz zmutować użytkownika z wyższą lub równą rolą niż ty.");
      return;
    }

    if (targetUserRolePosition >= botRolePosition) {
      await interaction.editReply("Nie mogę zmutować użytkownika z wyższą lub równą rolą niż ja.");
      return;
    }

    // Timeout the user
    try {
      const { default: prettyMs } = await import('pretty-ms');

      if (targetUser.isCommunicationDisabled()) {
        await targetUser.timeout(msDuration, reason);
        await interaction.editReply(`${targetUser} został zmutowany na ${prettyMs(msDuration, { verbose: true })}\nPowód: ${reason}`); 
        return;
      }

      await targetUser.timeout(msDuration, reason);
      await interaction.editReply(`${targetUser} został zmutowany na ${prettyMs(msDuration, { verbose: true })}\nPowód: ${reason}`); 
    } catch (error) {
      console.log(`There was an error when timing out: ${error}`); 
    }
  },

  name: 'timeout',
  description: 'Mutuje użytkownika na określony czas.',
  options: [
    {
      name: 'target-user',
      description: 'Użytkownik do zmutowania.',
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
    {
      name: 'duration',
      description: 'Czas działania (30m, 1h, 1 day).',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'reason',
      description: 'Powód zmutowania.',
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.MuteMembers],
  botPermissions: [PermissionFlagsBits.MuteMembers],
};
