import { findChannel } from './entity';

const guildId = process.env.GUILD_ID

// Checks if the category and text channel exist for this bot to function. If not, they are automatically created.
async function attemptToCreateChannels(categoryName) {
    const existingCategoryChannel = await findChannel(guildId, { name: 'buildBot', type: 'GUILD_CATEGORY' });

    if (existingCategoryChannel)
        if (await findChannel(guildId, { name: 'buildBot-text', type: 'GUILD_TEXT ' }))
            return;

    const guild = await getGuild(guildId);

    // If we previously found the category to exist, categoryChannel equals the existing category. Else, we create a new one
    const categoryChannel = existingCategoryChannel ? existingCategoryChannel :  await guild.channels.create('BuildBot', {
        name: 'buildBot',
        type: 'category',
        permissionOverwrites: [
            {
                id: guild.roles.everyone,
                allow: ['VIEW_CHANNEL', 'ADD_REACTIONS'],
                deny: ['SEND_MESSAGES']
            },
        ],
    }).catch(_ => { throw 'Failed to create a new category channel'; })

    // If we made it this far, we definitely need to make a text channel in the category lol
    const textChannel = guild.channels.create('BuildBotText', {
        name: 'buildBotCreate',
        type: ChannelType.GuildText,
        parent: categoryChannel.id
    }).catch(_ => { throw 'Failed to create a new text channel'; });
}

