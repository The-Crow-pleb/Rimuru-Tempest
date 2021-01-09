const { MessageEmbed } = require("discord.js");
const languages = require('../../utils/languages/languages')

module.exports = (client, message, query) => {

    const {guild} = message
    const nothing = new MessageEmbed()
        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
        .setDescription(`${languages(guild, "NRVT")} ${query}`)
        .setColor("RED")
    message.channel.send(nothing).then(msg => msg.delete({timeout: 10000}))

};