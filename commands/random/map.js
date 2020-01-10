const commando = require('discord.js-commando');
const Discord = require('discord.js');
const client = new Discord.Client();

class mapCommand extends commando.Command {
    constructor(client) { //when command is loaded
        super(client, {
            name: 'map',
            group: 'general',
            memberName: 'map',
            description: 'Shows a map of the area'
        });
    }

    async run(message, args) {
        const embed = new Discord.RichEmbed()
            .setTitle("WinHacks - University of Windsor Map")
            .setAuthor("WinHacks Bot", "https://i.imgur.com/u8xvvdd.jpg")
            .setColor(0x00AE86)
            .setDescription("The hackathon is hosted in the Odette School of Business. Refer to the image below for the map of the campus.")
            .setFooter("WinHacks 2020, Windsor, Ontario", "https://i.imgur.com/u8xvvdd.jpg")
            .setImage("http://pickup.myweb.cs.uwindsor.ca/buildings/OB.png")
            .setThumbnail("https://i.imgur.com/u8xvvdd.jpg")
            .setTimestamp();
        message.channel.send({ embed });
    }
}

module.exports = mapCommand;