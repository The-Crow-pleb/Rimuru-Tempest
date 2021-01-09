const { MessageEmbed } = require("discord.js");
const languages = require('../../utils/languages/languages')

module.exports = (client, message, queue) => {

    const {guild} = message
    const ended = new MessageEmbed()
        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
        .setDescription(languages(guild, "QEVT"))
        .setColor("RANDOM")
    message.channel.send(ended).then(msg => msg.delete({timeout: 10000}))

};