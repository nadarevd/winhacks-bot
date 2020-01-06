const commando = require('discord.js-commando');

var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModuke) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

const fetch = require('node-fetch');
// const then_redis_1 = require("then-redis");
const discord_js_1 = require("discord.js");
const node_geocoder_1 = __importDefault(require("node-geocoder"));
const DarkSky = require('dark-sky');
const google_key = process.env.GOOGLE_KEY;
const darksky = new DarkSky(process.env.DARK_SKY_KEY);
// const redis = then_redis_1.createClient(process.env.REDIS_URL);
const geocoder = node_geocoder_1.default({
    provider: "google",
    apiKey: google_key
});

class WeatherCommand extends commando.Command {
    constructor(client) { //when command is loaded
        super(client, {
            name: 'weather',
            group: 'random',
            memberName: 'weather',
            description: 'Displays the weather based off the location provided'
        });
    }

    async run(message, args) {
        // postal codes: 6 characters, 
        let city = message.content.split(" ")[1];
        message.reply(city);
    }
}

module.exports = WeatherCommand;

function buildAndSend({ latitude, longitude, formatted }, channel) {
    if (latitude && longitude && formatted) {
        dark_sky.latitude(latitude)
            .longitude(longitude)
            .exclude('minutely')
            .get()
            .then(weather => {
                const url = `https://darksky.net/forecast/${latitude},${longitude}/us12/en`;
                const embed = new Discord.RichEmbed();
                embed.setTitle(`Weather for ${formatted}`);
                embed.setURL(url);
                embed.setColor("#663399");
                embed.addField(`Temperature`, `${weather.currently.temperature}°F`, true);
                embed.addField(`Humidity`, `${Math.Floor(weather.currently.humidity *100)}%`, true);
                embed.addField('Conditions', weather.currently.summary, false);
                embed.addField('Forecast', weather.hourly.summary, false);
                channel.send('', { embed });
            })
            .catch(console.log);
    }


}