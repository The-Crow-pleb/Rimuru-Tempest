const { MessageEmbed } = require("discord.js");
const languages = require('../../utils/languages/languages')

module.exports = async(client, message, queue) => {
    
    const {guild} = message
    const left = new MessageEmbed()
        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
        .setColor("RED")
        .setDescription(languages(guild, "BTEVT"))
    message.channel.send(left).then(msg => {msg.delete({timeout: 15000})})
}