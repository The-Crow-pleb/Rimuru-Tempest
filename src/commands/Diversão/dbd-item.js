const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    aliases:[],
    description: '',
    //playerstats?steamid=${id}(&json,&stat=bloodpoints,&stat[]=bloodpoints&stat[]=survivor_rank)
    run:async(client, message, args) => {
        // let id = args[0]
        // if(!id) return message.reply('nope')
        try {
            let stats = await fetch(`https://dbd.onteh.net.au/api/iteminfo?item=Item_Camper_Flashlight&pretty&json`, {method: 'GET'}).then(res => res.json())
            console.log(stats)
            
            const embed = new MessageEmbed()
                .addFields(
                    {
                        name: 'bloodpoints', value: stats
                    }
                )
            message.reply(embed)
        } catch (error) {
            console.log(error)
            message.reply('Oops')
        }
        
    }
}