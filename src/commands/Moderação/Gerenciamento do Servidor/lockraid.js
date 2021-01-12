const { MessageEmbed } = require("discord.js")
const languages = require("../../../utils/languages/languages")

module.exports = {
    aliases: ['lr'],
    description: 'Locka o servidor em caso de raid',
    run: async(client, message, args) => {
        const {guild} = message
        const role = guild.roles.everyone
        perm = ["MANAGE_CHANNELS"]
        
        if(!message.member.hasPermission(perm)) {
            message.delete()
            const noPerm = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setDescription(languages(guild, "noperm"))
                .addFields(
                    {name: `${languages(guild, "noperm2")}`,value: `${languages(guild, "noperm3")} \`${perm}\``}
                )
            message.reply(noPerm).then(msg => msg.delete({timeout: 10000})); return
        } else if(!message.guild.me.hasPermission(perm)) {
            message.delete()
            const noPerm = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setDescription(languages(guild, "nobotperm"))
                .addFields(
                    {name: `${languages(guild, "noperm2")}`,value: `${languages(guild, "noperm3")} \`${perm}\``}
                )
            message.reply(noPerm).then(msg => msg.delete({timeout: 10000})); return
        }
        message.delete()
        const sucess = new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({dynamic:true}))
            .setColor("GREEN")
            .setDescription(languages(guild, "lckr"))
            .addField(`${languages(guild, "lckr2")} \`${guild.name}\``, `${languages(guild, "LCK3")} \`${role.name}\``)
        message.reply(sucess).then((msg) => {
            setTimeout(() => {
                message.guild.channels.cache.forEach(async(channel, id) => {
                    channel.createOverwrite(role, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    }).catch(err => {
                        msg.delete()
                        const embedError = new MessageEmbed()
                            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                            .setDescription(`${languages(guild, "M_E")}`)
                            .addFields(
                                {name: `${languages(guild, "M_E2")}`,value: `\`\`\`${err}\`\`\``},
                                {name: `${languages(guild, "M_E3")}`,value: `${languages(guild, "M_E4")}`}
                            )
                        const solution = new MessageEmbed()
                            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                            .setDescription(`${languages(guild, "M_E5")}`)
                            .addFields(
                                {name: `${languages(guild, "M_E7")}`,value: `${languages(guild, "M_E8")}`}
                            )
                        pages = [embedError,solution]
                        pageEmbed(message,pages)
                    })
                })
            }, 1000);
        })

    }
}