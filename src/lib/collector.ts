import { ButtonInteraction, ComponentType, GuildTextBasedChannel, Interaction, Message } from "discord.js"

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

export const collectButtonById = async (buttonId: string, message: Message, collectFromUserId?: string): Promise<ButtonInteraction> => {
    return new Promise((resolve, reject) => {
        const collector = message.createMessageComponentCollector({
            filter: interaction => interaction.componentType == ComponentType.Button && interaction.customId == buttonId && (!collectFromUserId || interaction.user.id == collectFromUserId),
            time: 30000,
            max: 1
        });

        collector.on('collect', interaction => {
            resolve(interaction as ButtonInteraction);
        });

        collector.on('end', collected => {
            if (collected.size == 0)
                reject();
        })
    })
}

export const collectButton = async (message: Message, collectFromUserId?: string): Promise<ButtonInteraction> => {
    return new Promise((resolve, reject) => {
        const collector = message.createMessageComponentCollector({
            filter: interaction => interaction.componentType == ComponentType.Button && (!collectFromUserId || interaction.user.id == collectFromUserId),
            time: 30000,
            max: 1
        });

        collector.on('collect', interaction => {
            resolve(interaction as ButtonInteraction);
        });

        collector.on('end', collected => {
            if (collected.size == 0)
                reject();
        })
    })
}