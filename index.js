//Necessary Discord.js classes
const { Client, Events, GatewayIntenBits, ActivityFlags, MessageReaction, } = require('discord.js');

//login token (pulled from environment variables)
const token = process.env.DISCORD_TOKEN

import { speakScript } from 'acts/speakWithUser.js'
import { getGuild, getChannel, findChannel, findMessage, emojiType } from 'acts/entity.js'
import { attemptToCreateChannels, messageSend } from 'acts/utils.js'

//new client instance
export const client = new Client({ intents: [GatewayIntentBits.Guilds, intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

//When the client is ready, run this code (once)
// 'c' is the event parameter, kept seperate from the defined client
client.once(Events.ClientReady, c => {
    console.log(`Ready! logged in as ${c.user.tag}`)


    attemptToCreateChannels() //ensures there is a category, and 
    const msg = messageSend()//ensures there is a message with a reaction to listen to
});

client.on('messageReactionAdd', async (reaction, user) => {
    //ensures that the message
    if ( reaction.message === findMessage && reaction.emoji.identifier === emoji ) {
        speakScript(user)
    }
    return;
})

//Logs into Discord with the client's token
client.login(token);
