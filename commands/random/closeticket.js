const commando = require('discord.js-commando');
const Discord = require('discord.js');
const client = new Discord.Client();

class streamCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'closeticket',
            group: 'support',
            memberName: 'closeticket',
            description: 'Closes existing tickets and archives the ticket.'
        });
    }

    async run(message, args) {
        if (!message.member.roles.find("name", "Hacker")) {
            message.channel.send("You need certain permissions to close a ticket.");
            return;
        }

        const string = `${message.channel.name}`.toString().toLowerCase();
        const substring = `${message.author.username}-ticket`.toString().toLowerCase();
        if (string.includes(substring)) {
            message.channel.delete('closing ticket.');
            message.member.send("Your support ticket is now closed!");
        } else {
            const fetched = await message.channel.fetchMessages({ limit: 1 });
            message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send(`Error: ${error}`));

            message.member.send(`<@${message.author.id}> You can only close your ticket in your ticket-shanner!`);
        }
    }
}

module.exports = streamCommand;