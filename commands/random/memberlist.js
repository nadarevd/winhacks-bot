const commando = require('discord.js-commando');
const Discord = require('discord.js');
const client = new Discord.Client();
var fs = require('fs');
const data = require('./data.json'); //deleted for github, make your own json.

//i know... globals are shit
let index;
let emailsOfAttending = [];

class memberslistCommand extends commando.Command {
    constructor(client) { //when command is loaded
        super(client, {
            name: 'memberlist',
            group: 'admin',
            memberName: 'memberlist',
            description: 'Lists all the hackers.'
        });
    }

    async run(message, args) {
        let count = 0;
        let memberArray = [];
        if (message.member.roles.find("name", "Lead Organizer")) {
            var roleID = "687365346776449038"
            var size = message.guild.roles.get(roleID).guild.memberCount;
            const list = message.guild.roles.get(roleID).guild.members.map(m => {
                memberArray.push(m.displayName);
                if (!checkUser(m.displayName)) {
                    if (m.roles.find("name", "Hacker")) {
                        count++;
                        message.channel.send(`Discord: ${m.displayName}`)
                    }
                }
            });
            message.channel.send(`${count} members with no username equal to their name on typeform `);
        } else { message.member.send("You do not have admin permissions to use !memberlist."); }
    }
}

function checkUser(name) {
    var tempJSON = data;
    let jsonName;
    let discordName = name.toString();
    let matchedEmail;
    discordName = discordName.toLowerCase();
    for (let i = 0; i < tempJSON.length; i++) {
        jsonName = `${tempJSON[i].firstname} ${tempJSON[i].lastname}`.toString().toLowerCase();
        if (discordName === jsonName) {
            index = i;
            matchedEmail = `${tempJSON[i].email}`.toString();
            emailsOfAttending.push(matchedEmail);
            return true;
        }
    }
    return false;
}

module.exports = memberslistCommand;