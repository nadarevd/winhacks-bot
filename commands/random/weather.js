const commando = require('discord.js-commando');
const fetch = require('node-fetch');
const discord_js_1 = require("discord.js");
const Discord = require('discord.js');
var weather = require('weather-js');


class WeatherCommand extends commando.Command {
    constructor(client) { //when command is loaded
        super(client, {
            name: 'weather',
            group: 'general',
            memberName: 'weather',
            description: 'Displays the weather based off the location provided'
        });
    }

    async run(message, args) {
        let city = '';
        let i = 0;
        let temp = message.content.split(" ");

        if (temp.length > 1) {
            for (let i = 1; i < temp.length; i++) {
                city += message.content.split(" ")[i];
            }
        }
        // message.reply(city);

        weather.find({ search: city, degreeType: 'C' }, function(err, result) {
            if (err) {
                // console.log(err);
                message.channel.send(err);
            } else {
                try {
                    var current = result[0].current;
                    var location = result[0].location;
                } catch (error) {
                    message.channel.send("Sorry I didn't quite get that.");
                    return;
                }

                console.log(current);
                const embed = new Discord.RichEmbed()
                    .setDescription(`**${current.skytext}**`)
                    .setAuthor(`WinHacks Bot - Weather for ${current.observationpoint}`)
                    .setThumbnail("https://i.imgur.com/u8xvvdd.jpg")
                    .setColor(0x00AF86)
                    .addField('Timezone', 'UTC' + location.timezone, true)
                    .addField('Temperature', current.temperature + ' °C', true)
                    .addField('Feels like', current.feelslike + ' Degrees', true)
                    .addField('Winds', current.winddisplay, true)
                    .addField('Time', current.observationtime, true)
                    .addField('Humidity', current.humidity + '%', true)
                message.channel.send({ embed });
            }
        });
    }
}

module.exports = WeatherCommand;

//     const url = `https://darksky.net/forecast/${latitude},${longitude}/us12/en`;
//     const embed = new Discord.RichEmbed();
//     embed.setTitle(`Weather for ${formatted}`);
//     embed.setURL(url);
//     embed.setColor("#663399");
//     embed.addField(`Temperature`, `${weather.currently.temperature}°F`, true);
//     embed.addField(`Humidity`, `${Math.Floor(weather.currently.humidity *100)}%`, true);
//     embed.addField('Conditions', weather.currently.summary, false);
//     embed.addField('Forecast', weather.hourly.summary, false);
//     channel.send('', { embed });
// }