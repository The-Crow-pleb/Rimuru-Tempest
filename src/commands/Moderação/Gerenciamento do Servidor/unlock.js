const { MessageEmbed } = require("discord.js")
const languages = require("../../../utils/languages/languages")

module.exports = {
    aliases: [],
    description: 'Deslocka um canal',
    run: async(client, message, args) => {
        const {guild} = message
        const channel = message.mentions.channels.first() || message.channel
        const role = message.mentions.roles.first() || guild.roles.cache.get(args[1])
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
        if(args < 1) {
            message.delete()
            const noRoleOrChannel = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic:true}))
                .setColor("RANDOM")
                .setDescription(languages(guild, "ncreate4"))
                .addField(languages(guild, "ncreate3"), languages(guild, "lck"))
            message.reply(noRoleOrChannel).then(msg => msg.delete({timeout: 10000})); return
        } else if (!role) {
            message.delete()
            const noRoleOrChannel = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic:true}))
                .setColor("RANDOM")
                .setDescription(languages(guild, "ADDR"))
                .addField(languages(guild, "ncreate3"), languages(guild, "lck"))
            message.reply(noRoleOrChannel).then(msg => msg.delete({timeout: 10000})); return
        }
        message.delete()
        const sucess = new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({dynamic:true}))
            .setColor("GREEN")
            .setDescription(languages(guild, "LCK"))
            .addField(languages(guild, "LCK2"), `${languages(guild, "LCK3")} \`${role.name}\``)
        message.reply(sucess).then((msg) => {
            setTimeout(() => {
                channel.createOverwrite(role, {
                    SEND_MESSAGES: null,
                    ADD_REACTIONS: null
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
            }, 1000);
        })

    }
}