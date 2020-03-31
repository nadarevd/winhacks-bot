const commando = require('discord.js-commando');
const Discord = require('discord.js');


class scheduleCommand extends commando.Command {
    constructor(client) { //when command is loaded
        super(client, {
            name: 'schedule',
            group: 'general',
            memberName: 'schedule',
            description: 'Shows you an organized schedule of what is happening during the event.'
        });
    }

    async run(message, args) {
        let pages = ['page 1', 'page 2', 'page 3'];
        let dates = ['Friday - March 27th, 2020', 'Saturday - March 28th, 2020', 'Sunday - March 29th, 2020'];
        var time_slots_friday = [
            "5:00 PM - Minecraft Server Opens\n6:00 PM - Opening Ceremonies\n7:30 PM - Team Formation Starts\n8:30 PM - Capture the Flag\n9:30 PM - Pick your Project\n9:30 PM - Discussion about Challenges\n9:30 PM - Competition AMA\n10:30 PM - Women's & LGBTQ Meetup\n11:00 PM - Check-in closes\n11:30 PM - GitHub\n",

            "8:30 AM - Opening Day 2\n9:00 AM - WEtech Alliance Ideation Workshop\n10:05 AM - Introduction to Artificial Intelligence\n11:10 AM - Leveraging City of Windsor Traffic Data Workshop\n12:15 PM - BlackBerry Recruiter Q & A\n1:30 PM - Fiix Software, Test Driven Development\n2:35 PM - Technical Communications Workshop\n3:40 PM - Google Firebase / Firestore\n4:45 PM - Google Cloud Platform / Data Analytics\n5:50 PM - Introduction to Ruby on Rails Workshop\n6:00 PM - League of Legends Tournament Starts\n7:00 PM - Google TensorFlow Webinar\n7:00 PM - Google Cloud Hero Challenge\n8:05 PM - Quantum Computing Workshop\n9:10 PM - Ethical Hacking and Cybersecurity\n10:15 PM - Introduction to Web Development\n11:20 PM - Landing an Internship\n",

            "1:00 AM - EZY Mode Tournament Stream Replay\n8:45 AM - Opening Day 3\n9:00 AM - Soft Submission Deadline\n9:45 AM - Hard Submission Deadline\n10:00 AM - Event re-cap and discussion\n11:00 AM - Stream Highlights\n12:00 PM - Minecraft & League of Legends Winners Announced\n1:00 PM - Behind the Scenes Slideshow\n2:00 PM - Team Presentations\n3:00 PM  - Awards\n3:30 PM - Closing Ceremonies\n"
        ];
        let page = 1;
        const embed = new Discord.RichEmbed()
            .setThumbnail("https://i.imgur.com/u8xvvdd.jpg")
            .setColor(0x00AF86)
            .setTitle("Schedule: " + dates[page - 1])
            .setDescription(time_slots_friday[page - 1])
            .setFooter(`Page ` + page + ' of ' + pages.length + ` - Eastern Standard Time Schedule`)
        message.channel.send(embed).then(msg => {
            msg.react('⏪').then(r => {
                msg.react('⏩')
                    //filters 
                const backwardsFilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
                const forwardsFilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id;

                const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 });
                const forwards = msg.createReactionCollector(forwardsFilter, { time: 60000 });
                backwards.on('collect', r => {
                    if (page === 1) return;
                    page--;
                    embed.setTitle("Schedule: " + dates[page - 1])
                    embed.setDescription(time_slots_friday[page - 1])
                    embed.setFooter(`Page ` + page + ' of ' + pages.length)
                    msg.edit(embed)
                })

                forwards.on('collect', r => {
                    if (page === pages.length) return;
                    page++;
                    embed.setTitle("Schedule: " + dates[page - 1])
                    embed.setDescription(time_slots_friday[page - 1])
                    embed.setFooter(`Page ` + page + ' of ' + pages.length + ` - Eastern Standard Time Schedule`)
                    msg.edit(embed)
                })
            })
        })
    }
}


module.exports = scheduleCommand;