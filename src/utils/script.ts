import { ActionRowBuilder } from '@discordjs/builders'
import { client } from '../index'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, EmbedBuilder, Events, GatewayIntentBits, GuildTextBasedChannel, IntentsBitField } from 'discord.js';
import { collectMessage } from '../lib/collector';


export const buttonBuild = async (customId: string, label: string, style: ButtonStyle) => {
  const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(customId)
                .setLabel(label)
                .setStyle(style),
    );
  return [row]; //converted to a list so it can be called in the 'reply' discord.js function
}

export const embedBuild = async (title, description) => {
  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)

  return embed;
  }
//easily builds an embed for readibility



export const speakScript = async (interaction, userId) => {
  //READ
  //This is essentially a message script between the bot, where the bot intakes parameters from the user.
  
  //variables
  const userIdentification = userId;
  //





    //creates a button
  await interaction.interaction({
    embeds: [
      embedBuild('Gamemode Selection', 'Please select which Call of Duty Modern Warfare II gamemode this weapon build is for with the buttons below.')
    ],
    components: [
      buttonBuild('comp', 'Competitive', ButtonStyle.Danger),
      buttonBuild('cas', 'Casual', ButtonStyle.Success)
    ],
    ephemeral: true
  });

  let gamemodeType = await collect(interaction.channel as GuildTextBasedChannel, interaction.user.id);
  
  await reply.delete();

  await interaction.editReply({
      content: '',
      ephemeral: true
  })



    /**
     * TODO:
     * GO OVER TEXT SCRIPT
     * read up on opensourceCV
     * roadmap 
     */
}