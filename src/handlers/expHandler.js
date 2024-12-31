const fs = require('fs');
let expData = {};
const cooldowns = new Map();

module.exports = (client) => {
    // Wczytaj dane EXP z pliku, jeśli istnieją
    if (fs.existsSync('expData.json')) {
        expData = JSON.parse(fs.readFileSync('expData.json', 'utf8'));
    } else {
        fs.writeFileSync('expData.json', JSON.stringify(expData, null, 2));
    }

    client.on('messageCreate', (message) => {
        if (message.author.bot) return;

        const userId = message.author.id;
        const now = Date.now();
        const cooldownAmount = 10 * 1000; // 10 sekund

        if (cooldowns.has(userId)) {
            const expirationTime = cooldowns.get(userId);
            if (now < expirationTime) {
                const timeLeft = ((expirationTime - now) / 1000).toFixed(1);
                console.log(`User ${userId} is on cooldown. Time left: ${timeLeft} seconds`);
                return; // Jeśli użytkownik jest na cooldownie, nie dodawaj EXP
            } 
        } 
        cooldowns.set(userId, now + cooldownAmount);
        console.log(`User ${userId} added to cooldown until ${new Date(now + cooldownAmount).toLocaleTimeString()}`);

        // Obliczanie EXP
        const currentExp = expData[userId] || 0;
        let expToAdd;

        if (message.attachments.size > 0) {
            expToAdd = Math.floor(Math.random() * 91) + 30; // Wiadomość z załącznikiem - między 30 a 120 EXP
        } else {
            expToAdd = Math.floor(Math.random() * 31) + 20; // Wiadomość bez załącznika - między 20 a 50 EXP
        }

        expData[userId] = currentExp + expToAdd;
        console.log(`User ${userId} gained ${expToAdd} EXP. Total EXP: ${expData[userId]}`);

        // Zapis do pliku
        fs.writeFileSync('expData.json', JSON.stringify(expData, null, 2));
    });

    // Funkcja do resetowania danych EXP
    client.resetPl = () => {
        expData = {};
        fs.writeFileSync('expData.json', JSON.stringify(expData, null, 2));
        console.log('EXP data has been reset');
    };
};