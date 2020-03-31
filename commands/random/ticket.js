const commando = require('discord.js-commando');
const Discord = require('discord.js');
const client = new Discord.Client();



class ticketCommand extends commando.Command {
    constructor(client) { //when command is loaded
        super(client, {
            name: 'ticket',
            group: 'support',
            memberName: 'ticket',
            description: 'Sends a support ticket and create a temporary channel for the user and staff. This is ONLY for support for your projects.'
        });
    }

    async run(message, args) {

        const embed = new Discord.RichEmbed()
            .setTitle("Welcome to your temporary private channel!")
            .setAuthor("WinHacks Bot", "https://i.imgur.com/H8mBCYw.png")
            .setThumbnail("https://i.imgur.com/4RyXR3I.png")
            .setURL("https://winhacks.ca")
            .setDescription("No one else can see this channel besides you and the Mentors! When you are done, close your ticket by doing !closeticket. WARNING: This deletes the channel, so do not use this command until you don't need the information anymore. Now, feel free to chat here!")
            .setFooter("WinHacks Bot - Ticket Support")

        if (message.author.bot) return;
        if (message.channel.id === '691028326214664263') {
            const fetched = await message.channel.fetchMessages({ limit: 1 });

            message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send(`Error: ${error}`));

            const UserID = message.author.id;
            let guild = message.guild;
            guild.createChannel(`${message.author.username}-ticket`, {
                type: 'text',
                permissionOverwrites: [{
                        allow: "VIEW_CHANNEL",
                        id: message.author.id
                    },
                    {
                        allow: "VIEW_CHANNEL",
                        id: '687365160867856393' // mentor
                    },
                    {
                        allow: "VIEW_CHANNEL",
                        id: '687365094996574255' //IT Help
                    },
                    {
                        deny: "VIEW_CHANNEL",
                        id: guild.id
                    }
                ]
            }).then(channel => {
                let category = message.guild.channels.find(c => c.name == "tickets" && c.type == "category");
                if (!category) throw new Error("Category channel does not exist");
                channel.setParent(category.id);
                channel.send(`Hello, <@${UserID}>!`);
                channel.send(embed);
            }).catch(console.error);
        }
    }
}

module.exports = ticketCommand;