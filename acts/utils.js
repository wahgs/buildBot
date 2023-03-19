
import { Client, Intents } from 'discord.js';
const Discord = require('discord.js');
const client = new Discord.Client({ intents: [''] });

const guildId = process.env.GUILD_ID

//creates a category only bot can write in
function makeCategoryAndMessage() {
    //creates new category
    const category = client.guilds.cache.get(guildId).channels.create('BuildBot', {
        name: 'buildBot',
        type: 'category',
        permissionOverwrites: [
            {
                id: client.guilds.cache.get(guildId).roles.everyone,
                allow: ['VIEW_CHANNEL', 'ADD_REACTIONS'],
                deny: ['SEND_MESSAGES']
            },
        ],
    });

    console.log(`Created category: ${category.name}`);

    //creates the text channel
    const textChannel = client.guilds.cache.get(guildId).channels.create('BuildBotText', {
        name: 'buildBotCreate',
        type: ChannelType.GuildText
    });
};

//the function will check for a category with provided category id
async function checkCategoryExists(categoryName) {
    //checks if a channel exists under the category name
    if (messageLink.guild.channels.exists(categoryName, ticketname))
        if (messageLink.guild.channel.textChannel.exists(textCategoryName,))
            return true;

    const buildBotCategory = client.channels.cache.find(category => category.type === 'GUILD_CATEGORY' && category.name === 'buildBot');

    if (!buildBotCategory)
        return console.log('Category not found.');

    const buildBotChannel = buildBotCategory.children.find(channel => channel.type === 'GUILD_TEXT' && channel.name === 'buildBot-text');

    if (buildBotChannel)
        return console.log(`Channel already exists: ${buildBotChannel.name}`);

    const result = await buildBotCategory.guild.channels.create('buildBot-text', {
        type: 'GUILD_TEXT',
        permissionOverwrites: [
            {
                id: buildBotCategory.guild.roles.everyone,
                deny: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
            },
            {
                id: client.user.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
            },
        ],
    }).catch(err => {
        console.error(err);
        return null;
    });

    if (result == null)
        return false;

    console.log(`Created new channel: ${channel.name}`);
    return true;
}

