const { MessageEmbed } = require("discord.js")
const languages = require("../../../utils/languages/languages")
const pageEmbed = require('discord.js-pagination')
module.exports = {
    aliases: ['drole'],
    description: 'Deleta um cargo',
    run: async(client, message, args) => {

        const {guild} = message
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
        perm = ["MANAGE_ROLES"]
        
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
        if(!member) {
            message.delete()
            if(!args[0]) {args[0] = languages(guild, "UN5")}
            const noMember = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setDescription(languages(guild, "nomemb"))
                .addFields(
                    {name: languages(guild, "nomemb2"),value: `\`${args[0]}\``},
                    {name: languages(guild, "ncreate3"), value: languages(guild, "addr3")}
                )
            message.reply(noMember).then(msg => msg.delete({timeout: 10000})); return
        } else if (!role) {
            message.delete()
            if(!args[1]) {args[1    ] = languages(guild, "UN5")}
            const noRole = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RED")
                .setDescription(languages(guild, "ADDR"))
                .addFields(
                    {name: languages(guild, "norl"),value: `\`${args[1]}\``},
                    {name: languages(guild, "ncreate3"), value: languages(guild, "addr3")}
                )
            message.reply(noRole).then(msg => msg.delete({timeout: 10000})); return
        } 
        if(!member.roles.cache.find(x => x.name === `${role.name}`)) {
            message.delete()
            const embed = new MessageEmbed()
                .setDescription(`${languages(guild, 'RADDR')} \`${role.name}\``)
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("RANDOM")
            message.reply(embed).then(msg => msg.delete({timeout: 10000})); return
        }
        if(member) {
            message.delete()
            const sucess = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setDescription(languages(guild, "raddr"))
                .addFields(
                    {name: languages(guild, "raddr2"), value: `\`${role.name}\``}
                )
                .setColor("GREEN")
            message.reply(sucess).then((msg) => {
                member.roles.remove(role).catch(err => {
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
                            {name: `${languages(guild, "M_E7")}`,value: `${languages(guild, "M_E8")}`}
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