const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (bot, message, args) => {
    let user;
    if (message.mentions.users.first()) {
        user = message.mentions.users.first();


    } else {
        user = message.author;
}

const member = message.guild.member(user);
let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if (!target) return message.reply(`Please @ the person you want to see the userinfo of!`).then(msg => msg.delete(10000));




const embed = new Discord.RichEmbed()
.setColor('7289da')
.setThumbnail(target.user.avatarURL)
.setTitle(`${user.username}#${user.discriminator}` ,)
.addField("Nickname:", `${member.nickname !== null ? `${member.nickname}` : 'None'}` , true)
.addField("Created at:", `${moment.utc(member.joinedAt).format("dddd, MMMM, YYYY, HH:mm:ss")}`, true)
.addField("Bot:", `${user.bot}`, true)
.addField("Status:", `${user.presence.status}`, true)
.addField("Game:", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
.addField("Roles:", member.roles.map(roles => `${roles.name}`).join(', '), true)
.addField("Mention:", `${target.user}`)
.addField("Userinfo request sent by:", message.author)
.setTimestamp()
message.channel.send({embed})

}

module.exports.help = {
    name: "whois"
}