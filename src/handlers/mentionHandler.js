module.exports = (client) => {
    client.on('messageCreate', async message => {
      if (message.mentions.has(client.user)) {
        const random = Math.floor(Math.random() * 10);
        switch (random) {
          case 0:
            message.reply('The clock is ticking, but with 8 seconds of pure time manipulation, there’s no escape for you.');
            break;
          case 1:
            message.reply('Even in a world where time itself bends to my will, I stand at the pinnacle, as the master of Star Platinum: Over Heaven.');
            break;
          case 2:
            message.reply('You think you can defeat me in 3 seconds? Try again, but this time, you’ll have to face 8 seconds of Star Platinum.');
            break;
          case 3:
            message.reply('My Stand, Star Platinum, has evolved… Its time stop now lasts 8 seconds. With this power, no one can challenge me.');
            break;
          case 4:
            message.reply('Do you believe you can challenge me? My Stand is beyond the laws of reality, and now, so am I.');
            break;
          case 5:
            message.reply('No matter what power you possess, Star Platinum: Over Heaven is the ultimate Stand. You cannot escape its reach.');
            break;
          case 6:
            message.reply('We’ve been through hell together, and we all survived. I won’t let their sacrifices be in vain, not ever again.');
            break;
          case 7:
            message.reply('Kakyoin, Joseph, Avdol… your courage still echoes in my heart. I won’t let any of you fall again.');
            break;
          case 8:
            message.reply('We faced the ultimate evil together, and we overcame it. No matter what, I will protect the lives of my friends—nothing will take them from me again.');
            break;
        }
      }
    });
  };