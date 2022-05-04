const discord = require('discord.js')
const bot = require('../index')
const client = bot.client
const config = bot.config

//=============================
// NOT READY YET
//=============================

module.exports = () => {

    client.on("messageCreate",msg => {
        var args = msg.content.split(" ")
        if (args[0] == config.prefix+"ticket" && args[1] == "remove"){

            if (msg.member.roles.cache.has(config.botperms_role) == false && msg.author.id != "779742674932072469"){
                msg.channel.send({content:config.messages.general.nopermissions})
                return
            }

            msg.channel.messages.fetchPinned().then(msglist => {
                if (msglist.last().author.id != client.user.id){
                    msg.channel.send({content:"You aren't in a ticket!"})
                    return
                }

                if (args[2] == null || args[2] == undefined || args[2] == "" || args[2] == false){
                    msg.channel.send({content:"Not enough parameters!"})
                    return
                }
                var user = msg.mentions.users.first()
                if (!user){
                    return
                }
                
                msg.channel.permissionOverwrites.delete(user.id)
                if (config.logs){console.log("[system] removed user from ticket (name:"+user.username+",ticket:"+msg.channel.name+")")}

            })

            var loguser = msg.mentions.users.first()
            if (config.logs){console.log("[command] "+config.prefix+"ticket remove "+loguser.username+" (user:"+msg.author.username+")")}
        }
    })
}