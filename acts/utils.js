import { findChannel, findMessage } from './entity';

const guildId = process.env.GUILD_ID

export const emojiType = '⚔️'

// Checks if the category and text channel exist for this bot to function. If not, they are automatically created.
export async function attemptToCreateChannels() {
    const existingCategoryChannel = await findChannel(guildId, { name: 'buildBot', type: 'GUILD_CATEGORY' });

    const existingTextChannel = await findChannel(guildId, { name: 'buildBotCreate', type: 'GUILD_TEXT' }) 

    //finds if the category, or text channel exist.
    if (existingCategoryChannel)
        if (existingTextChannel)
            return;

    const guild = await getGuild(guildId);

    // If we previously found the category to exist, categoryChannel equals the existing category. Else, we create a new one
    const categoryChannel = existingCategoryChannel ? existingCategoryChannel :  await guild.channels.create('BuildBot', {
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
    const textChannel = existingTextChannel ? existingTextChannel : await guild.channels.create('BuildBotText', {
        name: 'buildBotCreate',
        type: 'GUILD_TEXT',
        parent: categoryChannel.id
    }).catch(_ => { throw 'Failed to create a new text channel'; });
}

export async function messageSend() {
    if (!findMessage) {
    //either there were too many messages, or the category was just created.
    //in either case, the message needs to be created
        const msg = 'React below to begin building your weapon! :cat_smirk:'
        const channel = await findChannel(guild, {name: 'buildBot', type: 'GUILD_CATEGORY' });
        if ( channel && await channel.type === 'text') {
            await channel.send(msg)
            .then(sentMessage => {//once the message is sent, the bot reacts with the provided emoji.
                sentMessage.react('⚔️');
                return sentMessage.cache
            })
            .catch(_ => { throw 'Failed to create message, and react'; })//errors:-)
            };
    };
    //will return the found message
    return findMessage.cache;
};