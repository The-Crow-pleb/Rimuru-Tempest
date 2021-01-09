const { MessageEmbed } = require("discord.js");
const languages = require('../../utils/languages/languages')

module.exports = (client, message, queue) => {

    const {guild} = message
    message.channel.send(`${languages(guild, 'CEVT')}`)

};