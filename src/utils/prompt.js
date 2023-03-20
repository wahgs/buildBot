import { findChannel, findMessage } from '../lib/entity';

const guildId = process.env.GUILD_ID

export const emojiType = '⚔️'

// Checks if the category and text channel exist for this bot to function. If not, they are automatically created.
async function attemptToCreateChannels() {
    const existingCategoryChannel = await findChannel(guildId, { name: 'buildBot', type: 'GUILD_CATEGORY' });
    const existingTextChannel = await findChannel(guildId, { name: 'buildBotCreate', type: 'GUILD_TEXT' })

    //finds if the category, or text channel exist.
    if (existingCategoryChannel)
        if (existingTextChannel)
            return;

    const guild = await getGuild(guildId);

    // If we previously found the category to exist, categoryChannel equals the existing category. Else, we create a new one
    const categoryChannel = existingCategoryChannel ? existingCategoryChannel : await guild.channels.create('BuildBot', {
        name: 'buildBot',
        type: 'category',
        permissionOverwrites: [
            {
                id: guild.id,//guild.id references the @everyone role.
                allow: ['VIEW_CHANNEL', 'ADD_REACTIONS'],
                deny: ['SEND_MESSAGES']
            },
        ],
    }).catch(_ => { throw 'Failed to create a new category channel'; })

    // If we made it this far, we definitely need to make a text channel in the category lol
    await guild.channels.create('BuildBotText', {
        name: 'buildBotCreate',
        type: 'GUILD_TEXT',
        parent: categoryChannel.id
    }).catch(_ => { throw 'Failed to create a new text channel'; });
}

async function sendPromptMessage(channel) {
    const message = await channel.send(process.env.PROMPT_CONTENT).then(sentMessage => {
        sentMessage.react('⚔️');
        return sentMessage.cache
    }).catch(_ => { throw 'Failed to create message, and react'; })

    return message;
};

// Kyle 03/20/23
export const findPromptMessage = async () => {
    const channel = await findChannel(guildId, { name: 'BuildBotText', type: 'GUILD_TEXT' });

    if (!channel) {
        await attemptToCreateChannels();
        return await findPromptMessage();
    }

    const messages = await channel.messages.fetch();

    if (messages.size > 1) {
        console.log(`There were too many messages in the channel(${messages.size}), deleting all messages, and re-sending the promp.`);
        await channel.bulkDelete(messages.size);
        await sendPromptMessage();
        return await findPromptMessage(guildId, query);
    }

    if (messages[0].content != process.env.PROMPT_CONTENT)
        return null;

    return messages[0];
};