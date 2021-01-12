require('dotenv').config(); const partial = ["USER", "REACTION", "GUILD_MEMBER", "CHANNEL"];
const {Client} = require('discord.js'); const {Player} = require('discord-player')
const client = new Client({disableMentions: "everyone", partials: [partial]}); const player = new Player(client); const filters = require('./configs/music/filters.json')
const {registerCommands, registerEvents, registerPlayerEvents} = require('../src/utils/validation/registry');

(async() => {
    client.login(process.env.TOKEN); client.player = player; client.commands = new Map(); client.filters = filters;
    await registerPlayerEvents(player, '../../events/playerEvents')
    await registerCommands(client, '../../commands');
    await registerEvents(client, '../../events/discordEvents');
})();