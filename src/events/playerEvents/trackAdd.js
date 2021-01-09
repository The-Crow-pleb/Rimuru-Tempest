const { MessageEmbed } = require("discord.js");
const languages = require('../../utils/languages/languages')
const ms = require('ms')

module.exports = async(client, message, queue, track) => {

    const {guild} = message

    const started = new MessageEmbed()
        .setTitle(`${track.requestedBy.username} ${languages(guild, 'MEVT_2')}`, track.thumbnail)
        .setDescription(`${track.title}`)
        .setColor('RANDOM')
    message.channel.send(started).then(msg => msg.delete({timeout: 15000}))

};