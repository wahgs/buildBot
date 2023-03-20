//Necessary Discord.js classes
import { findMessage } from 'acts/entity.js';
import { speakScript } from 'acts/speakWithUser.js';
import { Client, Events, GatewayIntentBits } from 'discord.js';

//login token (pulled from environment variables)
const token = process.env.DISCORD_TOKEN

//new client instance
export const client = new Client({ intents: [GatewayIntentBits.Guilds, intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

//When the client is ready, run this code (once)
// 'c' is the event parameter, kept seperate from the defined client
client.once(Events.ClientReady, async () => {
    console.log(`Ready! logged in as ${c.user.tag}`)

    const message = await findPromptMessage() // ensures there is a message with a reaction to listen to
});

client.on('messageReactionAdd', async (reaction, user) => {
    //ensures that the message
    if (reaction.message === findMessage && reaction.emoji.identifier === emoji)
        speakScript(user)

    //if a user reacts to the message with a different emoji than the bot put
    if (reaction.message === findMessage && reaction.emoji.identifier !== emoji)
        reaction.remove

    return;
})

//Logs into Discord with the client's token
client.login(token);
