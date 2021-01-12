const { MessageEmbed } = require("discord.js")
const languages = require('../../../utils/languages/languages')

module.exports = {
    aliases: [],
    description: "Creates the DJ role",
    run: async(client, message) => {
        const { guild } = message
        perm = ['MANAGE_ROLES']
        if(!message.member.hasPermission(perm)) {
            const noPerm = new MessageEmbed()
                .setDescription(`${languages(guild, "DJ")}`)
                .addFields(
                    {
                        name: `${languages(guild, "DJ_2")}`,
                        value: `${languages(guild, "DJ_3")}`
                    }
                )
                .setColor('RED')
            message.reply(noPerm)
            return
        }
        if(!message.guild.me.hasPermission(perm)) {
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

        if(message.guild.roles.cache.find(x => x.name === "DJ")) {
            const exists = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setDescription(`${languages(guild, "DJ_6")}`)
                .setColor("RED")
            message.reply(exists)
            return
        }

        message.channel.send(`${languages(guild, "DJ_C")}`).then((msg) => {
            message.guild.roles.create({
                data: {
                    name: 'DJ',
                    color: 'grey',
                    permissions:[]
                },
                reason: 'DJ Role'
            })
            setTimeout(function() {
                msg.edit(`${languages(guild, "DJ_C2")}`)
            }, 3000)
        })
    }
}