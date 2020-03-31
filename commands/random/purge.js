const commando = require('discord.js-commando');
const Discord = require('discord.js');

class DiceRollCommand extends commando.Command {
    constructor(client) { //when command is loaded
        super(client, {
            name: 'purge',
            group: 'admin',
            memberName: 'purge',
            description: 'Deletes a specific amount of messages.'
        });
    }

    async run(message, args) {
        async function purge() {
            const prefix = '!';
            let msg = message.content.toUpperCase();
            let sender = message.author;
            let cont = message.content.slice(prefix.length).split(" ");
            let args = cont.slice(1);
            message.delete();
            if (!message.member.roles.find("name", "Lead Organizer") && !message.member.roles.find("name", "Organizer") && !message.member.roles.find("name", "Moderator")) {
                message.channel.send('You need admin permissions to purge.');
                return;
            }
            if (args[0] === 1) {
                message.channel.send("Purging 1 message is not necessary!");
                return;
            }
            if (isNaN(args[0])) {
                message.channel.send('Please use a number as your arguments.');
                return;
            }

            const fetched = await message.channel.fetchMessages({ limit: args[0] });
            message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send(`Error: ${error}`));
        }
        purge();
    }
}

module.exports = DiceRollCommand;