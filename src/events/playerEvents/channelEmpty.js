const { MessageEmbed } = require("discord.js");
const languages = require('../../utils/languages/languages')

module.exports = (client, message, queue) => {

    const {guild} = message
    const empty = new MessageEmbed() //or, me after 09/01/2021
        .setAuthor(guild.name, guild.iconURL({dymamic: true}))
        .setDescription(languages(guild, "CEVT"))
        .setColor("RED")
    message.channel.send(empty).then(msg => {msg.delete({timeout: 10000})})

};