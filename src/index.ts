require('dotenv').config();

//Necessary Discord.js classes
import { Client, Events, GatewayIntentBits, GuildTextBasedChannel, IntentsBitField } from 'discord.js';
import { collectMessage } from './lib/collector';
import { findPromptMessage } from './utils/prompt';

console.log(process.env.DISCORD_TOKEN);

//login token (pulled from environment variables)
const token = process.env.DISCORD_TOKEN

//new client instance
export const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages ] });

//When the client is ready, run this code (once)
// 'c' is the event parameter, kept seperate from the defined client
client.once(Events.ClientReady, async () => {
    console.log(`Ready! logged in as ${client.user.tag}`)
});

// Called whenever someone messages in a channel the bot can see
client.on('messageCreate', async message => {
    if (!message.content.startsWith('-test'))
        return;

    await message.channel.send('What\'s your favorite color?');

    const reply = await collectMessage(message.channel as GuildTextBasedChannel, message.author.id);

    console.log(reply.content);
})

//Logs into Discord with the client's token
client.login(token);
