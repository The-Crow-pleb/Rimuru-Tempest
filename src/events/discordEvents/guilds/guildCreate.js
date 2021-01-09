const langSchema = require('../../../configs/dbs/schemas/language-schema')
const { loadLangs } = require('../../../utils/languages/languages')

module.exports = async(client, guild) => {
    const guildId = guild.id
    await langSchema.findOneAndUpdate({_id: guildId,},{_id: guildId, language: 'english',},{upsert: true,})
    loadLangs(client)
}