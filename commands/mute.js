const Discord = require("discord.js");
const ms = require("ms");
const config = require('../config.json');

module.exports.run = async (bot, message, args) => {


    //!tempute @user 1s/m/h/d

    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    message.delete();
    if(!tomute) return message.reply("Couldn't find user.");
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
    let muterole = message.guild.roles.find(`name`, "Muted");
    //start of create role
    if(!muterole){
        try{
        muterole = await message.guild.creatRole({
            name: "muted",
            color: "#000000",
            permissions: []
        })
        message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            });
        });
    }catch(e){
        console.log(e.stack);
    }
}
    //end of create role
        let mutetime = args[1];
        if(!mutetime) return message.reply("You didn't specify the time!");


        await(tomute.addRole(muterole.id));
        message.reply(`<@${tomute.id}> has been muted for ${ms(mutetime)}`);

        setTimeout(function(){
            tomute.removeRole(muterole.id);
            message.channel.send(`<@${tomute.id}> has been unmuted!`);
        }, ms(mutetime));

        let muteEmbed = new Discord.RichEmbed()
        .setDescription("Mute")
        .setColor('7289da')
        .addField("Muted User", `${tomute} ID: ${tomute.id}`)
        .addField("Muted By", `<@${message.author.id}> ID: ${message.author.id}`)
        .addField("Muted in", message.channel)
        .addField("Time", message.createdAt)

        let muteChannel = message.guild.channels.find(`name`, "logs");
        if(!muteChannel) return message.channel.send("Cannot find the logs channel. Sorry pal.");
         muteChannel.send(muteEmbed);

        




//end of module 
    }
module.exports.help = {
    name: 'mute'
};
