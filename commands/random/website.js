const commando = require('discord.js-commando');
const Discord = require('discord.js');
const client = new Discord.Client();

class websiteCommand extends commando.Command {
    constructor(client) { //when command is loaded
        super(client, {
            name: 'website',
            group: 'general',
            memberName: 'website',
            description: 'Shows you information about the hackathon'
        });
    }

    async run(message, args) {
        const embed = new Discord.RichEmbed()
            .setTitle("To visit our website, click Here.")
            .setAuthor("WinHacks Bot", "https://i.imgur.com/u8xvvdd.jpg")
            .setColor(0x00AE86)
            .setDescription("If you are ready, visit our website and apply!")
            .setFooter("WinHacks 2020, Windsor, Ontario", "https://i.imgur.com/u8xvvdd.jpg")
            .setImage("https://i.imgur.com/xAz8LHF.jpg")
            .setThumbnail("https://i.imgur.com/u8xvvdd.jpg")
            .setDescription("If you know of other passionate people who are eager to show their skills to the world, let them know of WinHacks!")
            .setURL("https://winhacks.ca/")
            .setTimestamp();

        message.channel.send({ embed });
    }
}

module.exports = websiteCommand;