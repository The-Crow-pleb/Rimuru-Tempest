const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')
const steam = require('steamapi')
const s = new steam('4FB1AA8C64BE4493F0E7AC95BD3E17CF')

module.exports = {
    aliases:[],
    description: '',
    //playerstats?steamid=${id}(&json,&stat=bloodpoints,&stat[]=bloodpoints&stat[]=survivor_rank)
    run:async(client, message, args) => {
        let id = args[0]
        if(!id) return message.reply('nope')
        try {
        //     s.getUserStats(`${id}`, '381210').then(data => data.stats)
            let stats = await fetch(`https://dbd.onteh.net.au/api/playerstats?steamid=${id}`).then(res => res.json()).catch(err => console.log(err))

            console.log(stats)
            const embed = new MessageEmbed()
                .addFields(
                    {
                        name: 'bloodpoints', value: `${stats.bloodpoints}`
                    },
                    {
                        name: 'survivor rank', value: stats.survivor_rank
                    }
                )
            message.reply(embed)
        } catch (error) {
            console.log(error);
            let msg = await fetch(`https://dbd.onteh.net.au/?json=profile&profile=${id}`, {
                    "headers": {
                        "accept": "application/json",
                    },
                    "referrer": "https://dbd.onteh.net.au/"
                }).catch(err => console.log(err))
            console.log(msg)
            message.reply('Oops')
        }
        
    }
}
