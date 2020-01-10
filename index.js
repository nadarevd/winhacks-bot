const commando = require('discord.js-commando');
const bot = new commando.Client();

bot.registry.registerGroup('random', 'Random');
bot.registry.registerGroup('general', 'General');
bot.registry.registerDefaults(); //shows all commands the bot has
bot.registry.registerCommandsIn(__dirname + "/commands");

//dont forget login code