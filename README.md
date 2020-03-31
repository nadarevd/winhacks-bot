# WinHacks Bot
Node JS Discord bot used to manage Windsor's First Digital Hackathon, WinHacks (https://winhacks.ca/).

## !stream, !website, !map
The bot links specific links, such as the WinHacks website, Twitch stream.

## !weather
This bot bot fetched information from [weather-js](https://www.npmjs.com/package/weather-js). It also uses microsoft APIs.

## !schedule
The bot uses paginations to create a schedule of events, using emojis to turn the page.
![Schedule command](https://i.gyazo.com/1b2840d83337a63608da8d7272b1d2d5.gif)

## !purge 
The bot can delete messages in bulk, in case of spam or unwanted messages.
![purge command](https://i.gyazo.com/4b62e24897a0920792c2e6f3b0ea28ad.gif)

## !ticket & !closeticket
This is a ticket system where, upon executing the !ticket command, a private channel is created for the participant and all the mentors. When the user is satisfied with the assistance, they can !closeticket to delete the channel.

## !verify
new members of a discord can !verify their email to see if they have successfully registered to the event. This mitigates the risk bots entering or raids from occuring.

## !memberlist
This is not intended for uses outside of WinHacks. This was simply my way of checking if everyone's usernames matched the data in the RSVP list.

## !roll
Rolls a die :)
