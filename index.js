//Necessary Discord.js classes
const {Client, Events, GatewayIntenBits, ActivityFlags,  } = require('discord.js');
const token = process.env.DISCORD_TOKEN

import {makeCategoryAndMessage, checkCategoryExists} from 'acts/utils.js'

//new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//When the client is ready, run this code (once)
// 'c' is the event parameter, kept seperate from the defined client
client.once(Events.ClientReady, c => {
    console.log(`Ready! logged in as ${c.user.tag}`) 
});

//Logs into Discord with the client's token
client.login(token);

//checks that there is no category already created
if (!checkCategoryExists('buildBot')) {
    console.log('Category \'buildBot\' doesn\'t exist, creating.')
    //creates a category called \'buildBot\'
    //creates a text channel, sends prompt message, reacts to said message.
    makeCategoryAndMessage()
}