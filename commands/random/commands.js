const commando = require('discord.js-commando');
const Discord = require('discord.js');
const client = new Discord.Client();

class commandsCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'comm',
            group: 'general',
            memberName: 'comm',
            description: 'Shows you a list of the commands that we have.'
        });
    }

    async run(message, args) {
        const embed = new Discord.RichEmbed()
            .setAuthor("WinHacks Bot", "https://i.imgur.com/u8xvvdd.jpg")
            .setColor(0x00AE86)
            .setFooter("WinHacks 2020, Windsor, Ontario", "https://i.imgur.com/u8xvvdd.jpg")
            .setThumbnail("https://i.imgur.com/u8xvvdd.jpg")
            .setDescription(`
            schedule: Shows you an organized schedule of what is happening during the event --> !schedule\n
            weather: Displays the weather based off the location provided --> Example: !weather Windsor,ON\n
            website: Shows you information about the hackathon --> !website\n
            stream: Links the stream for WinHacks! --> !stream\n
            roll: Rolls a die! --> !roll\n
            comm: Shows you a list of the commands that we have. --> !comm\n
            ticket: Sends a support ticket and create a temporary channel for the user and staff. This is ONLY for support for your projects. --> !ticket\n
            closeticket: Closes existing tickets and archives the ticket. --> !closeticket\n

            `)
            .setTimestamp();

        message.channel.send({ embed });


    }
}

module.exports = commandsCommand;