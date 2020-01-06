const commando = require('discord.js-commando');
const bot = new commando.Client();

bot.registry.registerGroup('random', 'Random');
bot.registry.registerDefaults(); //shows all commands the bot has
bot.registry.registerCommandsIn(__dirname + "/commands");


bot.login('NjYyOTE2MzI2MTc1ODAxNDA1.XhERmQ.X3QrTMvrUK9cU3qP0fNBnNGJi24');