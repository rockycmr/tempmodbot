const discord = require("discord.js");
const config = require('../config.json');

module.exports.run = async (bot, message, args) => {

    let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let reason = args.slice(1).join(' ');
    let logs = message.guild.channels.find('name', config.logsChannel);

    if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply('You dont have enough permissions for this command, mortal.');

    if (!target) return message.reply('please specify a member to kick!');
    if (!reason) return message.reply('please specify a reason for this kick!');
    if (!logs) return message.reply(`please create a channel called ${config.logsChannel} to log the kicks!`);
    
    
    let embed = new discord.RichEmbed()
        .setColor('7289da')
        .setThumbnail(target.user.avatarURL)
        .addField('Kicked Member', `${target.user.username} with an ID: ${target.user.id}`)
        .addField('Kicked By', `${message.author.username} with an ID: ${message.author.id}`)
        .addField('Kicked Time', message.createdAt)
        .addField('Kicked At', message.channel)
        .addField('Kicked Reason', reason)
        .setTimestamp(message.createdAt)
        .setFooter('Kicked user information', target.user.displayAvatarURL);

    message.channel.send(`${target.user.username} was kicked by ${message.author} for ${reason}`);
    message.delete();
    await target.user.send(`You were kicked by ${message.author.tag} for ${reason}.`)
    await target.kick(reason);
    logs.send(embed);

};

module.exports.help = {
    name: 'kick'
};

