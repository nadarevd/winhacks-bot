const commando = require('discord.js-commando');
const Discord = require('discord.js');
const client = new Discord.Client();

class streamCommand extends commando.Command {
    constructor(client) { //when command is loaded
        super(client, {
            name: 'stream',
            group: 'general',
            memberName: 'stream',
            description: 'Links the stream for WinHacks.'
        });
    }

    async run(message, args) {
        const embed = new Discord.RichEmbed()
            .setTitle("To visit our stream, click Here.")
            .setAuthor("WinHacks Bot", "https://i.imgur.com/u8xvvdd.jpg")
            .setColor(0x00AE86)
            .setFooter("WinHacks 2020, Windsor, Ontario", "https://i.imgur.com/u8xvvdd.jpg")
            .setImage("https://i.imgur.com/B7FTSw1.png")
            .setThumbnail("https://i.imgur.com/u8xvvdd.jpg")
            .setDescription("Use !schedule to see what we will be doing! You can also check out our schedule on our website: http://winhacks.ca")
            .setURL("https://www.twitch.tv/winhacksca")
            .setTimestamp();

        message.channel.send({ embed });


    }
}

module.exports = streamCommand;