import { GuildTextBasedChannel, Message } from "discord.js"

export const collectMessage = async (channel: GuildTextBasedChannel, collectFromUserId: string): Promise<Message> => {
    return new Promise((resolve, reject) => {
        const collector = channel.createMessageCollector({
            filter: message => message.author.id == collectFromUserId,
            time: 30000, // 30 seconds = 30000 milliseconds
            max: 1
        });

        collector.on('collect', message => {
            resolve(message);
        });

        collector.on('end', collected => {
            if (collected.size == 0)
                reject();
        });
    });
};