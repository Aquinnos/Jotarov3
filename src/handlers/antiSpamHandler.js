const cooldowns = new Map();

module.exports = (client) => {
  client.on('messageCreate', async (message) => {
    if (message.author.bot) return; 

    const userId = message.author.id;
    const now = Date.now();

    if (!cooldowns.has(userId)) {
      cooldowns.set(userId, []);
    }

    const timestamps = cooldowns.get(userId);
    timestamps.push(now);

    const expirationTime = now - 7000;
    while (timestamps.length > 0 && timestamps[0] < expirationTime) {
      timestamps.shift();
    }

    if (timestamps.length > 5) {
      message.channel.send('STAR FINGER!!!!');
      message.delete();

      try {
        console.log(`Applying timeout to user ${message.author.tag} for 7 seconds.`);
        console.log(`Current time: ${new Date(now).toString()}`);
        console.log(`Timeout duration: 7000 milliseconds`);

        await message.member.timeout(7000, 'Spamowanie na czacie');
        console.log(`User ${message.author.tag} has been muted for 7 seconds due to spamming.`);
      } catch (error) {
        console.error(`There was an error when muting the user: ${error}`);
      }

      cooldowns.set(userId, [now + 7000]);
    }
  });
};