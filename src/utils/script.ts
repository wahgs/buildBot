import { ActionRowBuilder } from '@discordjs/builders'
import { client } from '../index'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, EmbedBuilder, Events, GatewayIntentBits, GuildTextBasedChannel, GuildTextBasedChannel, IntentsBitField, Message } from 'discord.js';
import { collectMessage } from '../lib/collector';
import { acceptableGamemodeTypes} from '../utils/acceptableLists'


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

//improved embedBuilder readability, by requiring two strings.
export const embedBuild = async (title, description) => {
  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)

  return embed;
  }




export const speakScript = async (interaction, userId) => {

  //once the 'Begin' button is clicked:
  await interaction.reply({
    embeds: embedBuild('Competitive or Public Matches?', 'Is this build a [comp]etitive CDL class? Or a [pub]lic match build?'),
    ephemeral: true
  });

  let reply = await collectMessage(interaction.channel as GuildTextBasedChannel, interaction.user.id);
  
  //sets reply to a string so it can be assigned to a JSON object for storage purposes.
  const gamemodeType:string = reply.content

  /*this is the format for the rest of the speakScript
  //NOTE
  This is to be updated in the *beta* version of this bot to be all button interactions.*/

  await interaction.editReply({
    embeds: embedBuild('What is the category of the primary weapon of this class?', '[AR] Assault Rifle, [SMG] Sub-machine gun, [BR] Battle Rifle, [SG] Shotgun, [LMG] Light Machine-Gun, [MR] Marksman Rifles, [SR] Sniper Rifles'),
    ephemeral: true
    });

  let reply2 = await collectMessage(interaction.channel as GuildTextBasedChannel, interaction.user.id);
  const primaryWeaponType:string = reply2.content
  
  await interaction.editReply({
    embeds: embedBuild('Please state the gun that you are using.', 'This promp is NOT CaSe sensitive, but is space sensitive For example, you could insert "kastov 74-u" for the Kastov 74-u'),
    ephemeral: true
    });

  let reply3 = await collectMessage(interaction.channel as GuildTextBasedChannel, interaction.user.id);
  const primaryWeaponGun:string = reply3.content

};