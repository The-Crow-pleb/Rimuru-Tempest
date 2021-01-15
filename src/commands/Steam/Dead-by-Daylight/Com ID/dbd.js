const { MessageEmbed } = require('discord.js')
const ssteam = require('steamapi')
const s = new ssteam(process.env.STEAM_TOKEN)

module.exports = {
    aliases:[],
    description: '',
    run:async(client, message, args) => {

        const {guild, author} = message
        const verify = new RegExp('(?:https?:\/\/)?steamcommunity\.com\/(?:profiles|id)\/[a-zA-Z0-9]+')
        let id = message.content.match(verify)
        
        if(id) {
            s.resolve(`${id}`).then((data) => {
                let id2 = data
                try {
                    s.getUserStats(`${id2}`, '381210').then((data) => {
                        s.getUserSummary(`${id2}`).then(summary => {
                            s.getUserRecentGames(`${id2}`).then(recent => {
                                let gameName = recent.find(x => x.name === 'Dead by Daylight')
                                if(!gameName) {
                                    const errEmbed = new MessageEmbed()
                                        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                                        .setDescription()
                                        .addFields(
                                            {name: '', value: ''},
                                        )
                                    message.reply(errEmbed); return
                                }
                                let gData = data.stats
                                let rawGameTime = gameName.playTime; let realGameTime = Math.floor(rawGameTime / 60)
                                let scpKO = data.stats.DBD_EscapeKO; let scpH = data.stats.DBD_HookedAndEscape; let scpHa = gData.DBD_EscapeThroughHatch;
                                let scpAllH = gData.DBD_AllEscapeThroughHatch; let scpdD = gData.DBD_DLC8_Camper_Stat1; let realRankingSurv = data.stats.DBD_CamperSkulls
                                if(scpKO === undefined) scpKO = '0'; if(scpH === undefined) scpH = '0'; if(scpHa === undefined) scpHa = '0';
                                if(scpAllH === undefined) scpAllH = '0'; if(scpdD === undefined) scpdD = '0'
                                const page1 = new MessageEmbed()
                                    .setDescription(`🎮 Estátisticas de Sobrevivente do jogador: \`${summary.nickname}\``)
                                    .addFields(
                                        {name: 'Rank de Sobreviventes (Em pontos):', value: `\`${realRankingSurv} Pontos \``, inline: true},
                                        {name: 'Escapou enquanto Rastejava:', value: `\`${scpKO} Vezes\``, inline: true},
                                        {name: "Escapou após se tirar do gancho:", value: `\`${scpH} Vezes\``, inline: true},
                                        {name: "Escapou através da Escotilha:", value: `\`${scpHa} Vezes\``, inline: true},
                                        {name: "Todos escaparam através da Escotilha:", value: `\`${scpAllH} Vezes\``, inline: true},
                                        {name: "Escapou após ter sido derrubado uma vez:", value: `\`${scpdD} Vezes\``, inline: true}
                                    )
                                    .setFooter(`${realGameTime} Horas de Jogo`, client.user.avatarURL())
                                message.reply(page1)
                            }).catch(err => {
                                const errEmbed = new MessageEmbed()
                                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                                    .setDescription()
                                    .addFields(
                                        {name: '', value: ''},
                                    )
                                message.reply(errEmbed)
                            })
                        }).catch(err => {
                            const errEmbed = new MessageEmbed()
                                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                                .setDescription()
                                .addFields(
                                    {name: '', value: ''},
                                )
                            message.reply(errEmbed)
                        })
                    }).catch(err => {
                        const errEmbed = new MessageEmbed()
                            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                            .setDescription()
                            .addFields(
                                {name: '', value: ''},
                            )
                        message.reply(errEmbed)
                    })
                } catch (error) {
                    console.log(error)
                    const errEmbed = new MessageEmbed()
                        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                        .setDescription()
                        .addFields(
                            {name: '', value: ''},
                        )
                    message.reply(errEmbed)
                }
            })
        } else if(id === null) {
            id = args[0]
            if(isNaN(id)) {
                s.resolve(`https://steamcommunity.com/id/${id}`).then((data) => {
                    let id2 = data
                    try {
                        s.getUserStats(`${id2}`, '381210').then((data) => {
                            s.getUserSummary(`${id2}`).then(summary => {
                                s.getUserRecentGames(`${id2}`).then(recent => {
                                    let gameName = recent.find(x => x.name === 'Dead by Daylight')
                                    if(!gameName) {
                                        const errEmbed = new MessageEmbed()
                                            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                                            .setDescription()
                                            .addFields(
                                                {name: '', value: ''},
                                            )
                                        message.reply(errEmbed); return
                                    }
                                    let gData = data.stats
                                    let rawGameTime = gameName.playTime; let realGameTime = Math.floor(rawGameTime / 60); let realRankingSurv = data.stats.DBD_CamperSkulls
                                    let scpKO = data.stats.DBD_EscapeKO; let scpH = data.stats.DBD_HookedAndEscape; let scpHa = gData.DBD_EscapeThroughHatch;
                                    let scpAllH = gData.DBD_AllEscapeThroughHatch; let scpdD = gData.DBD_DLC8_Camper_Stat1;
                                    if(scpKO === undefined) scpKO = '0'; if(scpH === undefined) scpH = '0'; if(scpHa === undefined) scpHa = '0';
                                    if(scpAllH === undefined) scpAllH = '0'; if(scpdD === undefined) scpdD = '0'
                                    const page1 = new MessageEmbed()
                                        .setDescription(`🎮 Estátisticas de Sobrevivente do jogador: \`${summary.nickname}\``)
                                        .addFields(
                                            {name: 'Rank de Sobreviventes (Em pontos):', value: `\`${realRankingSurv} Pontos \``, inline: true},
                                            {name: 'Escapou enquanto Rastejava:', value: `\`${scpKO} Vezes\``, inline: true},
                                            {name: "Escapou após se tirar do gancho:", value: `\`${scpH} Vezes\``, inline: true},
                                            {name: "Escapou através da Escotilha:", value: `\`${scpHa} Vezes\``, inline: true},
                                            {name: "Todos escaparam através da Escotilha:", value: `\`${scpAllH} Vezes\``, inline: true},
                                            {name: "Escapou após ter sido derrubado uma vez:", value: `\`${scpdD} Vezes\``, inline: true}
                                        )
                                        .setFooter(`${realGameTime} Horas de Jogo`, client.user.avatarURL())
                                    message.reply(page1)
                                }).catch(err => {
                                    const errEmbed = new MessageEmbed()
                                        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                                        .setDescription()
                                        .addFields(
                                            {name: '', value: ''},
                                        )
                                })
                            }).catch(err => {
                                const errEmbed = new MessageEmbed()
                                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                                    .setDescription()
                                    .addFields(
                                        {name: '', value: ''},
                                    )
                                message.reply(errEmbed)
                            })
                        }).catch(err => {
                            const errEmbed = new MessageEmbed()
                                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                                .setDescription()
                                .addFields(
                                    {name: '', value: ''},
                                )
                            message.reply(errEmbed)
                        })
                    } catch (error) {
                        const errEmbed = new MessageEmbed()
                            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                            .setDescription()
                            .addFields(
                                {name: '', value: ''},
                            )
                        message.reply(errEmbed)
                    }
                }).catch(err => message.reply(`Não foi encontrado nenhum perfil com o id: ${id}`))
            } else if(!isNaN(id)) {
                try {
                    s.getUserStats(`${id}`, '381210').then((data) => {
                        s.getUserSummary(`${id}`).then(summary => {
                            s.getUserRecentGames(`${id}`).then(recent => {
                                let gameName = recent.find(x => x.name === 'Dead by Daylight')
                                if(!gameName) {
                                    const errEmbed = new MessageEmbed()
                                        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                                        .setDescription()
                                        .addFields(
                                            {name: '', value: ''},
                                        )
                                    message.reply(errEmbed); return
                                }
                                let gData = data.stats
                                let rawGameTime = gameName.playTime; let realGameTime = Math.floor(rawGameTime / 60); let realRankingSurv = data.stats.DBD_CamperSkulls
                                let scpKO = data.stats.DBD_EscapeKO; let scpH = data.stats.DBD_HookedAndEscape; let scpHa = gData.DBD_EscapeThroughHatch;
                                let scpAllH = gData.DBD_AllEscapeThroughHatch; let scpdD = gData.DBD_DLC8_Camper_Stat1;
                                if(scpKO === undefined) scpKO = '0'; if(scpH === undefined) scpH = '0'; if(scpHa === undefined) scpHa = '0';
                                if(scpAllH === undefined) scpAllH = '0'; if(scpdD === undefined) scpdD = '0'
                                const page1 = new MessageEmbed()
                                    .setDescription(`🎮 Estátisticas de Sobrevivente do jogador: \`${summary.nickname}\``)
                                    .addFields(
                                        {name: 'Rank de Sobreviventes (Em pontos):', value: `\`${realRankingSurv} Pontos \``, inline: true},
                                        {name: 'Escapou enquanto Rastejava:', value: `\`${scpKO} Vezes\``, inline: true},
                                        {name: "Escapou após se tirar do gancho:", value: `\`${scpH} Vezes\``, inline: true},
                                        {name: "Escapou através da Escotilha:", value: `\`${scpHa} Vezes\``, inline: true},
                                        {name: "Todos escaparam através da Escotilha:", value: `\`${scpAllH} Vezes\``, inline: true},
                                        {name: "Escapou após ter sido derrubado uma vez:", value: `\`${scpdD} Vezes\``, inline: true}
                                    )
                                    .setFooter(`${realGameTime} Horas de Jogo`, client.user.avatarURL())
                                message.reply(page1)
                            }).catch(err => {
                                const errEmbed = new MessageEmbed()
                                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                                    .setDescription()
                                    .addFields(
                                        {name: '', value: ''},
                                    )
                                message.reply(errEmbed)
                            })
                        }).catch(err => {
                            const errEmbed = new MessageEmbed()
                                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                                .setDescription()
                                .addFields(
                                    {name: '', value: ''},
                                )
                            message.reply(errEmbed)
                        })
                    }).catch(err => {
                        const errEmbed = new MessageEmbed()
                            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                            .setDescription()
                            .addFields(
                                {name: '', value: ''},
                            )
                        message.reply(errEmbed)
                    })
                } catch (error) {
                    const errEmbed = new MessageEmbed()
                        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                        .setDescription()
                        .addFields(
                            {name: '', value: ''},
                        )
                    message.reply(errEmbed)
                }
            }
        }
    }
}