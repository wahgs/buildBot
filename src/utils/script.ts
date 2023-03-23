import { ActionRowBuilder } from '@discordjs/builders'
import { client } from '../index'
import { ButtonBuilder, ButtonStyle } from 'discord.js'




export const speakScript = async (user) => {
    //creates a button
    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('startBuild')
                .setLabel('Start build:crossed_swords:')
                .setStyle(ButtonStyle.Primary),
    );
    
    //sends the message to the user
  //  messageLink.send( { content: 'Let\'s being your build!', components: [row] });
    
    /**
     * TODO:
     * GO OVER TEXT SCRIPT
     * read up on opensourceCV
     * roadmap 
     */
}