const dbdSchema = require('../../../configs/dbs/schemas/dbd-id-schema')

module.exports = {
    aliases:['dbdregister', 'dbd registrar', 'dbd-r', 'rdbd'],
    description: '',
    run: async(client, message, args) => {
        let userId = message.author.id;
        let steamName = args[0];
        let steamID = args[1]

        await dbdSchema.findOneAndUpdate(
            {_id: steamName},
            {_id: steamName, steam: steamID, userID: userId },
            {upsert: true}
        ).then(result => console.log(result)).catch(err => console.log(err))
    }
}