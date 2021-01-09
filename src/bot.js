require('dotenv').config()
const {Client} = require('discord.js'); const {Player} = require('discord-player')
const client = new Client({disableMentions: "everyone"}); const player = new Player(client);
const {registerCommands, registerEvents, registerPlayerEvents} = require('../src/utils/validation/registry');

(async() => {
    client.login(process.env.TOKEN); client.player = player; client.commands = new Map();
    await registerPlayerEvents(player, '../../events/playerEvents')
    await registerCommands(client, '../../commands');
    await registerEvents(client, '../../events/discordEvents');
})();