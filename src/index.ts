require('dotenv').config();

//Necessary Discord.js classes
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, EmbedBuilder, Events, GatewayIntentBits, GuildTextBasedChannel, IntentsBitField } from 'discord.js';
import { collectMessage } from './lib/collector';
import { findPromptMessage } from './utils/prompt';

console.log(process.env.DISCORD_TOKEN);

//login token (pulled from environment variables)
const token = process.env.DISCORD_TOKEN

//new client instance
export const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] });

//When the client is ready, run this code (once)
// 'c' is the event parameter, kept seperate from the defined client
client.once(Events.ClientReady, async () => {
    console.log(`Ready! logged in as ${client.user.tag}`)

    // const channel = await client.channels.fetch('1083851444609880155').then(_ => client.channels.cache.get('1083851444609880155')) as GuildTextBasedChannel;
    // await channel.send({
    //     embeds: [
    //         new EmbedBuilder()
    //             .setTitle('Create a Build!')
    //             .setDescription('lorem ipsum text belongs here but im lazy as fuck')
    //     ],
    //     components: [
    //         new ActionRowBuilder<ButtonBuilder>().addComponents(
    //             new ButtonBuilder()
    //                 .setCustomId('start_create_a_build')
    //                 .setStyle(ButtonStyle.Primary)
    //                 .setLabel('Start')
    //         )
    //     ]
    // });
});

// Called whenever someone messages in a channel the bot can see
client.on('messageCreate', async message => {

})

// Called whenever someone starts a bot interaction (click a button, use a slash command, etc)
client.on('interactionCreate', async interaction => {
    if (!interaction.isMessageComponent() || interaction.customId != 'start_create_a_build')
        return;

    await interaction.reply({
        content: 'Whats your favorite color?',
        ephemeral: true
    });

    const reply = await collectMessage(interaction.channel as GuildTextBasedChannel, interaction.user.id);

    await reply.delete();

    await interaction.editReply({
        content: 'Whats your name?'
    })
})  

//Logs into Discord with the client's token
client.login(token);
