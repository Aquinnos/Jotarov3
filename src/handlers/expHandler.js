const fs = require('fs');
let expData = {};
const cooldowns = new Map();

module.exports = (client) => {
    if (fs.existsSync('expData.json')) {
        expData = JSON.parse(fs.readFileSync('expData.json', 'utf8'));
    } else {
        fs.writeFileSync('expData.json', JSON.stringify(expData, null, 2));
    }

    client.on('messageCreate', (message) => {
        if (message.author.bot) return;

        const userId = message.author.id;
        const now = Date.now();
        const cooldownAmount = 10 * 1000; 

        if (cooldowns.has(userId)) {
            const expirationTime = cooldowns.get(userId);
            if (now < expirationTime) {
                const timeLeft = ((expirationTime - now) / 1000).toFixed(1);
                console.log(`User ${userId} is on cooldown. Time left: ${timeLeft} seconds`);
                return; 
            } 
        } 
        cooldowns.set(userId, now + cooldownAmount);
        console.log(`User ${userId} added to cooldown until ${new Date(now + cooldownAmount).toLocaleTimeString()}`);

        const currentExp = expData[userId] || 0;
        let expToAdd;

        if (message.attachments.size > 0) {
            expToAdd = Math.floor(Math.random() * 91) + 30;
        } else {
            expToAdd = Math.floor(Math.random() * 31) + 20; 
        }

        expData[userId] = currentExp + expToAdd;
        console.log(`User ${userId} gained ${expToAdd} EXP. Total EXP: ${expData[userId]}`);

        fs.writeFileSync('expData.json', JSON.stringify(expData, null, 2));
    });

    client.resetPl = () => {
        expData = {};
        fs.writeFileSync('expData.json', JSON.stringify(expData, null, 2));
        console.log('EXP data has been reset');
    };
};