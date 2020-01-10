const commando = require('discord.js-commando');
const Discord = require('discord.js');

class DiceRollCommand extends commando.Command {
    constructor(client) { //when command is loaded
        super(client, {
            name: 'purge',
            group: 'general',
            memberName: 'purge',
            description: 'ADMIN - Deletes a specific amount of messages'
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

            if (!message.member.roles.find("name", "Main Organizers")) {
                message.channel.send('You need admin permissions to purge.');
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