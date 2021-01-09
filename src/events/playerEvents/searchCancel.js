const { MessageEmbed } = require("discord.js");
const languages = require('../../utils/languages/languages')

module.exports = (client, message, query, tracks) => {

    const {guild} = message
    const canceled = new MessageEmbed()
        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
        .setDescription(languages(guild, "SCVT"))
        .setColor("RED")
    message.channel.send(canceled).then(msg => msg.delete({timeout: 10000}))

};
