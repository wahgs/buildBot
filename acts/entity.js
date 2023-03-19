import { client } from 'client';

export const getGuild = async (guildId) => {
    // Fetches guild from API, then grabs the full discord.js guild entity from the cache (Two different entities, discord.js versions includes more quality of life features)
    return await client.guilds.fetch(guildId).then(() => client.guilds.cache.get(guildId));
}

export const getChannel = async (guildId, channelId) => {
    const guild = await getGuild(guildId);

    // Fetches channel from API, then grabs the full discord.js channel entity from the cache (Two different entities, discord.js versions includes more quality of life features)
    return await guild.channels.fetch(channelId).then(() => guild.channels.cache.get(channelId));
}

export const findChannel = async (guildId, query) => {
    const guild = await getGuild(guildId);

    // Populate the guilds channel cache with all existing channels
    await guild.channels.fetch();

    // Find channel matching channelName by looping through cache
    for (const channel of guild.channels.cache) {
        if (query.name && channel.name != query.name)
            continue;

        if (query.type && channel.type != query.type)
            continue;

        return channel;
    }

    return null;

}