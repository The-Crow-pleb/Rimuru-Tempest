const { MessageEmbed } = require("discord.js");
const languages = require('../../utils/languages/languages')

module.exports = (client, message, query, tracks, content, collector) => {

    const {guild} = message
    const invalid = new MessageEmbed() // or, me, again.
        .setColor("RED")
        .setDescription(`${languages(guild, "SIVT")} \`${tracks.lenght}\``)
        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
    message.channel.send(invalid).then(msg => msg.delete({timeout: 10000}))

};