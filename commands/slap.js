const discord = require("discord.js");
const config = require("../config.json");


module.exports.run = async (bot, message, args) => {

let reason = args.slice(1).join(' ');
let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

if (!target) return message.reply('please specify a member to backhand!');
if (!reason) return message.reply('please specify a reason for this backhand!');


  if(!message.member.hasPermission("ADMINISTRATOR")) return;
  message.delete().catch();
  message.channel.send(`${target} has been backhanded by ${message.author} for ${reason}`);

};



module.exports.help = {
name: "slap"
}