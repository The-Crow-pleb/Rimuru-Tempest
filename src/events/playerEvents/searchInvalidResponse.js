const { MessageEmbed } = require("discord.js");
const languages = require('../../utils/languages/languages')

module.exports = (client, message, query, tracks, content, collector) => {

    const {guild} = message
    message.channel.send(`${languages(guild, 'SIVT')} **${tracks.length}** !`)

};