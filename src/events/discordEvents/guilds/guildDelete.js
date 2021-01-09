const langSchema = require('../../../configs/dbs/schemas/language-schema')


module.exports = async(client, guild) => {

    const guildId = guild.id
    await langSchema.findOneAndRemove({_id: guildId,},{_id: guildId})

}