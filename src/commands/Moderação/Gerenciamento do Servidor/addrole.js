const { MessageEmbed } = require("discord.js")
const languages = require("../../../utils/languages/languages")
const pageEmbed = require('discord.js-pagination')
module.exports = {
    aliases: ['arole'],
    description: 'Adiciona um cargo',
    run: async(client, message, args) => {

        const {guild} = message
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
        perm = ["MANAGE_ROLES"]
        if(!message.member.hasPermission(perm)) {
            const noPerm = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setDescription(languages(guild, "noperm"))
                .addFields(
                    {
                        name: `${languages(guild, "noperm2")}`,
                        value: `${languages(guild, "noperm3")} \`${perm}\``
                    }
                )
            message.reply(noPerm); return
        } else if(!message.guild.me.hasPermission(perm)) {
            const noPerm = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setDescription(languages(guild, "nobotperm"))
                .addFields(
                    {
                        name: `${languages(guild, "noperm2")}`,
                        value: `${languages(guild, "noperm3")} \`${perm}\``
                    }
                )
            message.reply(noPerm); return
        }
        if(!role && member) {
            const noRole = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setDescription(languages(guild, "ADDR"))
            message.reply(noRole); return
        } else if (!member && role) {
            const noMember = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setDescription(languages(guild, "nomemb"))
                .addFields(
                    {
                        name: languages(guild, "nomemb2"),
                        value: `\`${args[0]}\``
                    }
                )
            message.reply(noMember); return
        }
        if(member) {
            const sucess = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setDescription(languages(guild, "addr"))
                .addFields(
                    {name: languages(guild, "addr2"), value: `\`${role.name}\``}
                )
                .setColor("GREEN")
            message.reply(sucess).then((msg) => {
                member.roles.add(role).catch(err => {
                    msg.delete()
                    const embedError = new MessageEmbed()
                        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                        .setDescription(`${languages(guild, "M_E")}`)
                        .addFields(
                            {
                                name: `${languages(guild, "M_E2")}`,
                                value: `\`\`\`${err}\`\`\``
                            },
                            {
                                name: `${languages(guild, "M_E3")}`,
                                value: `${languages(guild, "M_E4")}`
                            }
                        )
                    const solution = new MessageEmbed()
                        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                        .setDescription(`${languages(guild, "M_E5")}`)
                        .addFields(
                            {
                                name: `${languages(guild, "M_E6")}`,
                                value: `[Click Here](https://www.applepiebot.xyz/permission-flags)`
                            },
                            {
                                name: `${languages(guild, "M_E7")}`,
                                value: `${languages(guild, "M_E8")}`
                            }
                        )
                    pages = [
                        embedError,
                        solution
                    ]
                    pageEmbed(message,pages)
                })
            })
        }
        
    }
}