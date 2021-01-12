const { MessageEmbed } = require('discord.js')
const languages = require('../../../utils/languages/languages')

module.exports = {
    run: (client, message, args) => {
        const { guild } = message

        const apple = client.user
        if(message.author.bot) return;
        const initial = new MessageEmbed()
            .setDescription(`${languages(guild, "I_C")}`)
            .setAuthor(apple.username, apple.avatarURL())
            .addFields(
                {
                    name: `${languages(guild, "I2_C")}`,
                    value: `[${languages(guild, "clique")}](https://discord.com/oauth2/authorize?client_id=797311655386153000&scope=bot&permissions=1392504182)`
                }
            )
            .setFooter(`${languages(guild, "I3_C")}`)
            .setColor('RANDOM')
        message.reply(initial)
    },
    aliases: ['cvt', 'invite'],
    description: ''
}
