"use strict";
var fs = require("fs");
const data = require('./data.json');
const commando = require('discord.js-commando');

let index;

class verifyCommand extends commando.Command {
    constructor(client) { //when command is loaded
        super(client, {
            name: 'verify',
            group: 'admin',
            memberName: 'verify',
            description: 'Verifies members from the RSVP list.'
        });
    }

    async run(message, args) {
        let email = '';
        let i = 0;
        let temp = message.content.split(" ");

        if (temp.length > 1) {
            for (let i = 1; i < temp.length; i++) {
                email += message.content.split(" ")[i];
            }
        }
        if (getUserIndex(email)) {
            let username = `${data[index].firstname} ${data[index].lastname}`;
            message.member.setNickname(username).catch(e => console.log(e))
            let role = message.guild.roles.find(role => role.name === "Hacker")
            message.member.addRole(role)
            message.member.send("Success! Welcome to WinHacks! :smile:");
        } else {
            const fetched = await message.channel.fetchMessages({ limit: 1 });
            message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send(`Error: ${error}`));
            message.member.send("Sorry! That is an invalid or unregistered email! Did you do it correctly? The proper format for the command is: !verify mail@example.com");
            message.member.send("If you have not RSVP'd, please do so: https://winhacks.typeform.com/to/FjxLkl. If you have questions, please message Denis Nadarevic, Noah Campbell, or Jeremie Bornais for help! ");
        }
    }
}

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}

function getUserIndex(emailtwo) {
    var tempJSON = data;
    for (let i = 0; i < tempJSON.length; i++) {
        if (tempJSON[i].email === emailtwo) {
            index = i;
            return true;
        }
    }
    return false;
}

module.exports = verifyCommand;