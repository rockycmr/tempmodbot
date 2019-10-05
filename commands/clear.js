const discord = require("discord.js");
const config = require('../config.json');

module.exports.run = async (bot, message, args) => {




    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`Yo Nigg||n|| you dont have enough perms for that, man'`)
    if(!args[0]) return message.channel.send(`Please provide a valid amount of numbers to clear, ${message.author}`);
    let logs = message.guild.channels.find('name', config.logsChannel);


    let embed = new discord.RichEmbed()
        .setColor('7289da')
        .setTitle("**Clear Command Used**")
        .addField('Cleared by', `${message.author.username} ID: ${message.author.id}`)
        .addField(`Cleared amount: ${args[0]} messages in`, message.channel)
        .setTimestamp(message.createdAt)
        logs.send(embed);

    message.channel.bulkDelete(args[0]).then(()=> {
        message.delete();
        message.channel.send(`Successfully cleared ${args[0]} messages, ${message.author} ✅ `).then(msg => msg.delete(2000));
        

    });
}

module.exports.help = {
    name: "clear"
}