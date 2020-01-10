const commando = require('discord.js-commando');
const Discord = require('discord.js');


class scheduleCommand extends commando.Command {
    constructor(client) { //when command is loaded
        super(client, {
            name: 'schedule',
            group: 'general',
            memberName: 'schedule',
            description: 'Shows you an organized schedule of what is happening during the event'

        });
    }

    async run(message, args) {
        let pages = ['page 1', 'page 2', 'page 3'];
        let dates = ['Friday - March 27th, 2020', 'Saturday - March 28th, 2020', 'Sunday - March 29th, 2020'];
        var time_slots_friday = [
            "5:00pm - 12:00am  :  Registration Opens\n\n6:00pm - 7:30pm    :   Opening ceremonies\n\n7:30pm - 8:30pm    :   Dinner\n\n7:30pm - 8:30pm   :  Talk - Pick your Project\n\n8:30pm - 9:00pm   :  Team Formation\n\n7:30pm - 11:00pm  :  Hardware showcase\n\n11:00pm - Onward  :  Hardware checkout\n\n11:30pm - 12:30am :  Workshop - GitHub\n\n1:00am            :  Snack",

            "8:00am - 9:00am : Breakfast\n\n9:00am - 10:00am : Google Talk\n\n10:00am - 11:00am : Workshop\n\n11:00am - 12:00pm : Talk\n\n12:00pm - 1:00pm : Women's Meetup\n\n1:00pm - 2:00pm : Lunch - Vendor Booths\n\n2:00pm - 3:00pm : LGBTQ Meetup\n\n3:00pm - 4:00pm : Talk\n\n4:00pm - 5:00pm : Workshop\n\n5:00pm - 6:00pm : Talk\n\n6:00pm - 7:00pm : Activity\n\n7:00pm - 8:00pm : Dinner\n\n9:00pm - 10:00pm : Workshop\n\n10:00pm - 11:00pm : Activity\n\n11:00pm - 12:00pm : Workshop\n\n12:00pm - 1:00am : Workshop\n\n2:00am : Snack",

            "8:00am : Breakfast\n\n9:00am - 10:00am : Submission deadline\n\n10:00am - 1:00pm : Project showcase\n\n1:00pm - 2:00pm : Lunch\n\n2:00pm - 2:30pm : Closing Ceremonies - Awards"
        ];
        let page = 1;



        const embed = new Discord.RichEmbed()
            .setThumbnail("https://i.imgur.com/u8xvvdd.jpg")
            .setColor(0x00AF86)
            .setTitle("Schedule: " + dates[page - 1])
            .setDescription(time_slots_friday[page - 1])
            .setFooter(`Page ` + page + 'of ' + pages.length)
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
                    embed.setFooter(`Page ` + page + 'of ' + pages.length)
                    msg.edit(embed)
                })
            })
        })
    }
}


module.exports = scheduleCommand;