import { client } from '../index'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, EmbedBuilder, Events, GatewayIntentBits, GuildTextBasedChannel, IntentsBitField, Interaction, InteractionCollector, Message } from 'discord.js';
import { collectButton, collectMessage } from '../lib/collector';
import { acceptableGamemodeTypes } from './acceptableLists'

let queries = {
  "Comp":boolean : "",
  "overkill":boolean : "", 
  "primary" : "", 
  "secondary" : "", 
  "lethal": "", 
  "tactical": "",
  "basePerks":string : "", 
  "bonusPerk": "", 
  "ultimatePerk" : "", 
  "fieldUpgrade1": "",
   "fieldUpgrade2" :""
}
//easily build buttons
export const buttonBuild = async (customId: string, label: string, style: ButtonStyle) => {
  return new ButtonBuilder()
        .setCustomId(customId)
        .setLabel(label)
        .setStyle(style)
}

//improved embedBuilder readability, by requiring two strings.
export const embedBuild = async (title, description) => {
  return new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
}

const allQueriesMet = async ()
  const checkAllVars = async ( queries ) => {
    //
    for ( let i = 0; i++ === queries.length; i++ )

  }

//queries the match class type
const compScript = () => {
  return({
    embeds: embedBuild('Competitive or Public Matches?', 'Is this build a competitive / CDL class? Or a public match class?'),
    components: [ buttonBuild('competitive', 'Competitive', ButtonStyle.Danger), buttonBuild('pubs', 'Public Matches', ButtonStyle.Primary) ],
    ephemeral: true
  });
}

const postCompScript = async (resultInteraction) => {
  if (resultInteraction.customId === 'competitive')
    return true;
  else
    return false;
}

const overkillScript = () => {
  //this creates the prompt for asking the user if their casual lobby class uses overkill.
  return {
    embeds: embedBuild('Overkill perk?', 'If this build uses the Overkill perk, please select \'yes\', if not please select the \'no\' button.'),
    components: [ buttonBuild( 'y', 'Yes', ButtonStyle.Primary ), buttonBuild( 'n', 'No', ButtonStyle.Primary ) ],
    ephemeral: true
  }
}

const postOverkillScript = (resultInteraction) => {
  if (resultInteraction.customId == 'y') { 
    overkill = true
} else {
  overkill = false
}

const primaryWeaponTypesScript = async (interaction: Interaction) => {
  if (primary)
    return;
  
    const buttons = [
      buttonBuild('ar', 'Assault Rifle', ButtonStyle.Primary),
      buttonBuild('br', 'Battle Rifle', ButtonStyle.Primary),
      buttonBuild('smg', 'Sub-Machine Gun \(SMG\)', ButtonStyle.Primary),
      buttonBuild('sg', 'Shotgun', ButtonStyle.Primary),
      buttonBuild('lmg', 'Light Machine-Gun \(LMG\)', ButtonStyle.Primary),
      buttonBuild('mr', 'Marksman Rifle', ButtonStyle.Primary),
      buttonBuild('sr', 'Sniper Rifle', ButtonStyle.Primary),
      buttonBuild('ml', 'Melee', ButtonStyle.Primary)
    ];

    return{
      // ar, br, smg, sg, lmg, mr, sr, melee
      embeds: embedBuild('Primary Weapon Selection', 'From the buttons below, please select the weapon class of your Primary weapon.'),
      components: buttons,
      ephemeral: true
    };


    }


const secondaryWeaponTypesScript = async (interaction: Interaction) => {
  if (Primary)
    return;

  const buttons = [
    buttonBuild('hg', 'Handgun', ButtonStyle.Primary),
    buttonBuild('lmc', 'Launcher', ButtonStyle.Primary),
    buttonBuild('ml', 'Melee', ButtonStyle.Primary)
  ];

  return{
    // ar, br, smg, sg, lmg, mr, sr, melee
    embeds: embedBuild('Secondary Weapon Selection', 'From the buttons below, please select the weapon class of your Secondary weapon.'),
    components: buttons,
    ephemeral: true
  };


  }


//this function will create a bunch of buttons for a bot response, based off of the weapon type
//by assigning the weapon type, this function will return an array of buttonBuilders in rows of 5
//based off of the weaponType assigned, and the information held in the API database
const weaponButtonsFromWeaponType = async (weaponType: string, weaponClass: string, interaction: Interaction) => {
  
  //fetches the primary weapon names from the api

  let WeaponObject
  //
  const fetchPrimaryObject = await fetch(`API/${weaponClass}`).then(response => response.json)
    .then( data => {
      WeaponObject = data 
    })
    .catch(error => {
      console.error('Error fetching data: ', error)
    })

  
  const data = JSON.parse(WeaponObject);

  //var assignment
  let buttons
  let buttonsInThisRow:number = 0;
  //object.keys states that I just want the keys in this object
  //data is defined above as a JSON.parse, and weaponType : ex 'primary' || 'secondary' and weaponClass ex: 'ar' || 'handgun'
  const objectNames = Object.keys(data[weaponType])
  let row = new ActionRowBuilder();
  let rowCounter = 0

  //for loop to create buttons for each weapon in the class 
  for (let i = 0; i === objectNames.length; i++ ) {  
    if( rowCounter++ === 5 ) {
      rowCounter = 0 //deletes everything in da row

      //creates a button and inserts it into the row
      buttons.push(row);
      row = new ActionRowBuilder()
    }
    row.addComponents( await buttonBuild(`${i}`, objectNames[i], ButtonStyle.Primary) );
  }

  return{
    embeds: embedBuild(`Which '${weaponType}' would you like to assign to this class creation?`, `From the buttons below, please select the ${weaponType} that you would like to assign to this class creation.`),
    components: buttons,
    ephemeral: true
  };

}


export const speakScript = async (interaction, userId) => {



  //establishes if the build is for CDL (cdl classes have different rules)
  let replyMessage = await interaction.editReply({
    compScript
  })
  let resultInteraction = await collectButton(replyMessage);
  let comp = postCompScript(resultInteraction);
  await resultInteraction.deferUpdate();

//checks if the user is using overkill.... second guessing the importance of this
  if (await comp === true) {
    break;
  } else {
  let buttonReply = await interaction.editReply({
    overkillScript   
  });

  let resultInteraction = await collectButton(buttonReply);
  let overkill = postOverkillScript(resultInteraction);
  await resultInteraction.deferUpdate();
  }

  //begin message while loop
  while (!allQueriesMet) {

  }



  //let reply2 = await collectMessage(interaction.channel as GuildTextBasedChannel, interaction.user.id);
  //const primaryWeaponType: string = reply2.content
//
  //await interaction.editReply({
  //  embeds: embedBuild('Please state the gun that you are using.', 'This promp is NOT CaSe sensitive, but is space sensitive For example, you could insert "kastov 74-u" for the Kastov 74-u'),
  //  ephemeral: true
  //});
//
  //let reply3 = await collectMessage(interaction.channel as GuildTextBasedChannel, interaction.user.id);
  //const primaryWeaponGun: string = reply3.content

};