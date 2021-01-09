const { MessageEmbed } = require("discord.js");
const languages = require('../../utils/languages/languages')
module.exports = (client, message, playlist) => {

    const {guild} = message
    const newSong = new MessageEmbed()
        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
        .setColor("RANDOM")
        .setDescription(`${playlist.title} ${languages(guild, "PEVT")}`)
    message.channel.send(newSong).then(msg => msg.delete({timeout: 10000}))

};