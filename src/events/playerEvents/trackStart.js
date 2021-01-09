const { MessageEmbed } = require("discord.js");
const languages = require('../../utils/languages/languages')
const ms = require('ms')

module.exports = (client, message, track) => {
    const {guild} = message
    const started = new MessageEmbed()
        .setTitle(`${track.requestedBy.username} ${languages(guild, 'MEVT')}`, track.thumbnail)
        .setDescription(`${track.title}`)
        .setColor('RANDOM')
    message.channel.send(started).then(msg => msg.delete({timeout: ms('3m')}))
};