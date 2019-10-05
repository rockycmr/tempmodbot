const discord = require("discord.js");
const config = require("./config.json");
const bot = new discord.Client({disableEveryone: true});
const fs = require("fs");
require('dotenv/config');
const http = require('http');
const port = process.env.PORT || 3000
http.createServer().listen(port);


//when bot ready
bot.on("ready", async () => {
  console.log(`${bot.user.username} is ready for action!`);
  if (config.activity.streaming == true) {
    bot.user.setActivity(config.activity.game, {url: 'https://twitch.tv/username'});
  } else {
    bot.user.setActivity(config.activity.game, {type: 'WATCHING'}); //PLAYING, LISTENING, WATCHING
    bot.user.setStatus('online'); // dnd, idle, online, invisible
  }
});



//console chatter
let y = process.openStdin()
y.addListener("data", res => {
  let x = res.toString().trim().split(/ +/g)
  bot.channels.get("544554507066146816").send(x.join(" "));
})


// Message event
bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let command = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);

  if (!command.startsWith(prefix)) return;

  let cmd = bot.commands.get(command.slice(prefix.length));
  if (cmd) cmd.run(bot, message, args);
  
});


//load commands
bot.commands = new discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err)  console.error(err);
  let jsfiles = files.filter(f => f.split(".").pop() === "js");
 
  if (jsfiles.length <= 0) return console.log("There are no commands to load...");

  console.log(`Loading ${jsfiles.length} commands...`);
  jsfiles.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${i + 1}: ${f} loaded!`)
    bot.commands.set(props.help.name, props);
  });
});


//command response
bot.on('message', msg=>{
  if(msg.content === "gay"){
    msg.reply("**faggot**");  
}
})

//message edited


bot.on('messageUpdate', async(oldMessage, newMessage) =>{
  if(oldMessage.content === newMessage.content){
    return;
  }

  let msgEdited = new discord.RichEmbed()
    .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL)
    .setThumbnail(oldMessage.author.avatarURL)
    .setTitle("Message Edited")
    .setColor(`7289da`)
    .addField("Before", oldMessage.content, true)
    .addField("After", newMessage.content, true)
    .setTimestamp()
    .setFooter("Message Edited")

    let loggingChannel = newMessage.guild.channels.find(ch => ch.name === "logs")
    if(!loggingChannel) return;

    loggingChannel.send(msgEdited)


});

//message deleted
bot.on("messageDelete", async message => {
  var logchannel = bot.channels.get("544562865282088970");
  let logembed = new discord.RichEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setColor("RED")
  .setDescription(`**Message sent by,** ${message.author} **deleted in** ${message.channel}`)
  .addField("Message Content", message.content, true)
  .setFooter(`Author: ${message.author.id} | Message Id: ${message.id}`)
  .setTimestamp()
  logchannel.send(logembed)
})


const token = process.env.TOKEN;

bot.login(token);