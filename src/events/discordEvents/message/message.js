const PREFIX = process.env.PREFIX
const {RateLimiter} = require('discord.js-rate-limiter')
let limiter = new RateLimiter(2, 2000)
module.exports = async(client, message) => {
    const {guild, channel, author} = message
    let limited = limiter.take(author.id)

    if(message.author.bot) return
    if(message.channel.type === 'dm' && !ids) return
    if(message.content.startsWith(PREFIX)) {
        if (limited) return
        else {
            const [cmdName, ...cmdArgs] = message.content
                .slice(PREFIX.length)
                .trim()
                .split(/\s+/);
            if(client.commands.get(cmdName)) {client.commands.get(cmdName)(client, message, cmdArgs)}else return
        }
    }
}