import { client } from '../index'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, EmbedBuilder, Events, GatewayIntentBits, GuildTextBasedChannel, IntentsBitField, Interaction, Message } from 'discord.js';
import { collectButton, collectMessage } from '../lib/collector';
import { acceptableGamemodeTypes } from './acceptableLists'

let comp, Primary, Secondary, Lethal, Tactical, Perk1, Perk2, Perk3, fieldUpgrade1, fieldUpgrade2: boolean

export const buttonBuild = async (customId: string, label: string, style: ButtonStyle) => {
  return new ButtonBuilder()
        .setCustomId(customId)
        .setLabel(label)
        .setStyle(style),
}

//improved embedBuilder readability, by requiring two strings.
export const embedBuild = async (title, description) => {
  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)

  return embed;
}

const compScript = async (interaction: Interaction) => {
  const replyMessage = await interaction.edit({
    embeds: embedBuild('Competitive or Public Matches?', 'Is this build a [comp]etitive CDL class? Or a [pub]lic match build?'),
    components: [ buttonBuild('competitive', 'Competitive', ButtonStyle.Danger), buttonBuild('pubs', 'Public Matches', ButtonStyle.Primary) ],
    ephemeral: true
  });

  let resultInteraction = await collectButton(replyMessage);
  await resultInteraction.deferUpdate();

  switch (resultInteraction.customId) {
    case 'competitive': {
      const gamemodeType = 'competitive'
      return gamemodeType;
    }
    case 'pubs': {
      const gamemodeType = 'pubs'
      return gamemodeType;
    }
  }
}



const primaryScript = async (interaction: Interaction) => {
  if (Primary === true)
    return;
  
  else {
    const buttons = [
      buttonBuild('ar', 'Assault Rifle' ButtonStyle.Primary),
      buttonBuild('br', 'Battle Rifle', ButtonStyle.Primary),
      buttonBuild('smg', 'Sub-Machine Gun \(SMG\)', ButtonStyle.Primary),
      buttonBuild('sg', 'Shotgun', ButtonStyle.Primary),
      buttonBuild('lmg', 'Light Machine-Gun \(LMG\)', ButtonStyle.Primary),
      buttonBuild('mr', 'Marksman Rifle', ButtonStyle.Primary),
      buttonBuild('sr', 'Sniper Rifle', ButtonStyle.Primary),
      buttonBuild('ml', 'Melee', ButtonStyle.Primary)
    ]

    const replyMessage = await interaction.reply({
      // ar, br, smg, sg, lmg, mr, sr, melee
      embeds: embedBuild('Primary Weapon Selection', 'From the buttons below, please select the weapon class of your Primary weapon.'),
      components: buttons,
      ephemeral: true
    })

    let resultInteraction = await collectButton(replyMessage);
    await resultInteraction.deferUpdate();

    switch(resultInteraction.customId) {
      case 'ar':{
        const replyMessage = await interaction.reply({
          
        })
      }
    }
  }
}





export const speakScript = async (interaction, userId) => {

  //once the 'Begin' button is clicked:
  let comp, Primary, Secondary, Lethal, Tactical, Perk1, Perk2, Perk3, fieldUpgrade1, fieldUpgrade2: boolean


  await interaction.editReply({
    embeds: embedBuild('What would you like to select?', ''),
    components: [ ],
    ephemeral: true 
  })

  let reply = await collectMessage(interaction.channel as GuildTextBasedChannel, interaction.user.id);

  await interaction.editReply({
    embeds: embedBuild('What is the category of the primary weapon of this class?', '[AR] Assault Rifle, [SMG] Sub-machine gun, [BR] Battle Rifle, [SG] Shotgun, [LMG] Light Machine-Gun, [MR] Marksman Rifles, [SR] Sniper Rifles'),
    ephemeral: true
  });

  let reply2 = await collectMessage(interaction.channel as GuildTextBasedChannel, interaction.user.id);
  const primaryWeaponType: string = reply2.content

  await interaction.editReply({
    embeds: embedBuild('Please state the gun that you are using.', 'This promp is NOT CaSe sensitive, but is space sensitive For example, you could insert "kastov 74-u" for the Kastov 74-u'),
    ephemeral: true
  });

  let reply3 = await collectMessage(interaction.channel as GuildTextBasedChannel, interaction.user.id);
  const primaryWeaponGun: string = reply3.content

};