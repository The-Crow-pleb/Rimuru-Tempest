const { MessageEmbed } = require("discord.js")
const languages = require("../../../utils/languages/languages")

module.exports = {
    aliases: ['crole'],
    description: 'Cria um Cargo',
    run: async(client, message, args) => {
        const roleName = args[0]
        const roleColor = args[1]
        const {guild} = message
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
        if(!roleName) {
            const noRole = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setDescription(languages(guild, "ncreate4"))
                .addField(languages(guild, "ncreate3"), `\`${languages(guild, "ncreate5")}\``)
            message.reply(noRole); return
        }
        if(message.guild.roles.cache.find(x => x.name === roleName)) {
            const exists = new MessageEmbed()
                .setColor("RED")
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setDescription(languages(guild, "create"))
                .addField(languages(guild, "create2"), roleName)
            message.reply(exists); return
        } else {
            const create = new MessageEmbed()
                .setColor("GREEN")
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setDescription(languages(guild, "created"))
                .addField(languages(guild, "created2"), roleName)
            message.reply(create).then((msg) => {
                guild.roles.create({
                    data:{
                        name: roleName,
                        color: roleColor ? roleColor: "grey",
                        permissions: []
                    }
                }).catch(err => {
                    msg.delete()
                    const error = new MessageEmbed()
                        .setColor("RED")
                        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                        .setDescription(languages(guild, "ncreate"))
                        .addField(languages(guild, "ncreate2"), `\`${err}\``)
                    message.reply(error)
                })
            })
        }
    }
}