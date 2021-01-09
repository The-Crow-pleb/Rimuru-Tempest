const { MessageEmbed } = require("discord.js")
const languages = require('../../../utils/languages/languages')
module.exports = {
    aliases: ['av'],
    description: 'Mostra o Avatar de alguém',
    run: async(client, message, args) => {

        const {guild, author} = message
        const gUser = client.users.cache.get(args[0])
        const user = message.mentions.users.first()

        if(gUser && !user) {
            const gUserEmbed = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL())
                .setColor("RANDOM")
                .setDescription(`${languages(guild, "AV")} ${languages(guild, "AV3")}`)
                .setImage(gUser.avatarURL({dynamic: true, size: 2048}))
                .setTitle(`🌎🔍${gUser.username}`)
            message.reply(gUserEmbed)
        } else if(user) {
            const userEmbed = new MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(guild.name, guild.iconURL())
                .setDescription(`${languages(guild, "AV")} ${languages(guild, "AV3")}`)
                .setImage(user.avatarURL({dynamic: true, size: 2048}))
                .setTitle(`🌎🔍${user.username}`)
            message.reply(userEmbed)
        } else if(!user && !gUser) {
            const authorEmbed = new MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(guild.name, guild.iconURL())
                .setDescription(`${languages(guild, "AV")} ${languages(guild, "AV2")}`)
                .setImage(author.avatarURL({dynamic: true, size: 2048}))
                .setTitle(`🌎🔍${author.username}`)
            message.reply(authorEmbed)
        }
    }
}