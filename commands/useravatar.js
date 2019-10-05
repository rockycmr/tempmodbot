const discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (bot, message, args) => {

let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
let logs = message.guild.channels.find('name', config.logsChannel);

    if (!target) return message.reply(`Please write whose avatar you want to see. [Error 1]`).then(msg => msg.delete(2000));

    let embed = new discord.RichEmbed()
        .setColor('7289da')
        .setTitle(`${target.user.username}'s avatar:`)
        .setImage(target.user.avatarURL)
        .setTimestamp()
    message.channel.send(embed);

    let avatarLog = new discord.RichEmbed()
    .setColor('7289da')
    .setTitle('Avatar Command Used')
    .addField("Used by", message.author)
    logs.send(avatarLog)


};

module.exports.help = {
    name: 'useravatar'
};