const Discord = require("discord.js")
const qdb = require("quick.db")
const db = new qdb.table("botlist")
const { MessageActionRow, MessageButton } = require("discord.js")



const client = new Discord.Client({ intents: 32767 })
const discordModals = require('discord-modals') // Define the discord-modals package!
discordModals(client); // discord-modals needs your client in order to interact with modals
client.on("ready", async () => {
  const fetc = db.fetch(`bot`)
  // client.user.setActivity(`Latest Added Bot: ${fetc.botisim || "None"} | Son Eklenen Bot: ${fetc.botisim || "Yok!"}`)
  /*const { Modal, TextInputComponent, showModal } = require('discord-modals') // Now we extract the showModal method

const modal = new Modal() // We create a Modal
.setCustomId('modal-customid')
.setTitle('Test of Discord-Modals!')
.addComponents(
new TextInputComponent() // We create a Text Input Component
.setCustomId('textinput-customid')
.setLabel('Some text Here')
.setStyle('SHORT') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
.setMinLength(4)
.setMaxLength(10)
.setPlaceholder('Write a text here')
.setRequired(true) // If it's required or not
*/

  const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId('modapp')
        .setLabel('Create a Request')
        .setStyle('PRIMARY'),
    );

  //  })

  //await i.editReply({ content: 'A button was clicked!', components: [] });

  //.set(`basvuru`,{kullanici: })
  client.channels.cache.get("945408428178817064").send({ content: "> • **Click Button and Open Bot Add Menu** | **Butona Tıkla ve Bot ekleme Menüsünü aç!**", components: [row] })//then(x => {
  /*  setInterval(function(){
       var cc = client.channels.cache.get("970024089345458226")
        var msg = cc.messages.fetch("970742424743837757")
        msg.edit({content:"> • **Click Button and Request Application**", components:[row]})
    },1000)
})*/


})
client.on('modalSubmit', async (modal) => {
  if (modal.customId === 'modal-customid') {
    const isim = modal.getTextInputValue('botisim')
    const yas = modal.getTextInputValue('botaciklama')
    const dahaonce = modal.getTextInputValue('botaktiflik')
    const botplatform = modal.getTextInputValue('botplatform')
    const botid = modal.getTextInputValue('botid')
    const botpref = modal.getTextInputValue('botprefix')

    await modal.deferReply({ ephemeral: true })

    modal.followUp('<:greesy_bestonay:893222149228199986> Thanks! **Your Application has send Moderators, We See it.** | Teşekkürler! **Senin Başvurunu Kısa Zamanda Incelicez.**', { ephemeral: true })

    client.channels.cache.get("945409365870014475").send({ content: `<:greesy_bestonay:893222149228199986> **<@${modal.user.id}> created Bot Add application request!** | **Bot Ekleme Başvurusu Gönderdi!**` })
    const embed = new Discord.MessageEmbed()


      .setTitle("Yeni Bot Ekleme Başvuru!")

      .setColor("BLURPLE")
      .setDescription(`Gönderen: ${modal.user.username}#${modal.user.discriminator} | Eklemek İçin [Tıkla!](https://discord.com/oauth2/authorize?client_id=${botid}&scope=bot&permissions=2150943937)`)
      .addField("Bot Isim:", isim)
      .addField("Bot İD:", botid)
      .addField("Bot Prefix:", botpref)
      .addField("Bot Aciklama:", yas)
      .addField("Bot Aktiflik Süresi:", dahaonce)
    //ddField("Bot Platform:", botplatform)


    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('basvuru-onay')
          .setLabel('Onayla')
          .setStyle('PRIMARY'),
        new MessageButton()
          .setCustomId("basvuru-red")
          .setLabel("Reddet")
          .setStyle("DANGER")


      );
    db.set(`bot`, { sahip: modal.user.id, botisim: isim, botid: botid, prefix: botpref, aciklama: yas, botaktif: dahaonce })
    client.channels.cache.get("938852605659066368").send({ embeds: [embed], components: [row] })

  }


});
client.on("messageCreate", async (message) => {
  var prefix = "!"
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if (command === "botinfo") {
    const bt = db.fetch(`bot`)
    const isim2 = db.fetch(`bot.botisim`)
    const aciklama2 = db.fetch(`bot.aciklama`)
    const prefix2 = db.fetch(`bot.prefix`)
    const botaktif2 = db.fetch(`bot.botaktif`)
    const id2 = db.fetch(`bot.botid`)
    if (args[0] === bt.botid) {
      const embed = new Discord.MessageEmbed()
        .setDescription(`*Search Results for \`${isim2}\`*`)
        .setColor("#3437eb")
        .addField("Bot Name:", isim2)
        .addField("Bot Description:", `\n\`\`\`md\n${aciklama2}\n\`\`\``)
        .addField("Bot Prefix:", prefix2)
        .addField("Bot Active Time:", botaktif2)
        .addField("Bot ID:", id2)
      // .setFooter({name:"Made By Nicat.dcw | Uses Web API"})

const filter = (reaction, user) => {
	return reaction.emoji.name === '🔴' && user.id === message.author.id;
};
      return message.channel.send({ embeds: [embed] }).then(x=>{
          
            x.react("🔴")


x.awaitReactions({ filter, max: 4, time: 60000, errors: ['time'] })
	.then(collected => console.log(collected.size))
	.catch(collected => {
	//	console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
//await client.db.set(`weekly_${message.guild.id}_${user.id}`, Date.now());
       const ms = require("pretty-ms");

let timeout = 604800000;
        let weekly = db.fetch(`vote_${id2}_${message.author.id}`);

if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
    let time = ms(timeout - (Date.now() - weekly));
            x.reply("Already")
        }else {
           x.reply("**You Voted This Bot!** \ *Added +1 Votes*")
          db.set(`vote_${id2}_${message.author.id}`, Date.now());

        }



   })
	});
  
  } else { message.reply("<:Ceixsam219:853245311736479794> ** API Error Spawned!**") }
    //}catch(err){ message.reply ("")}
    if (!args[0]) return message.reply("<:Ceixsam219:853245311736479794> | **Bot Not Found our System!**")
  }

})
client.on("interactionCreate", async (interaction) => {
  if (interaction.customId === "modapp") {

    const { Modal, TextInputComponent, showModal } = require('discord-modals') // Now we extract the showModal method

    const modal = new Modal() // We create a Modal
      .setCustomId('modal-customid')
      .setTitle('BotList Application Form!')
      .addComponents(
        new TextInputComponent() // We create a Text Input Component
          .setCustomId('botisim')
          .setLabel('Name | Isim')
          .setStyle('SHORT') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
          .setMinLength(4)
          .setMaxLength(20)
          .setPlaceholder('Write Your Bot Name | Botun Ismi')
          .setRequired(true), // If it's required or not
        /*
        new TextInputComponent() // We create a Text Input Component
          .setCustomId('botid')
          .setLabel('What is Bot ID?')
          .setStyle('SHORT') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
          .setMinLength(2)
          .setMaxLength(18)
          .setPlaceholder('Your BOT ID | Botun ID')
          .setRequired(true),
        
           */
        new TextInputComponent() // We create a Text Input Component
          .setCustomId('botaciklama')
          .setLabel('Bot Descr.')
          .setStyle('LONG') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
          .setMinLength(1)
          .setMaxLength(500)
          .setPlaceholder('Description')
          .setRequired(true),


        new TextInputComponent() // We create a Text Input Component
          .setCustomId('botaktiflik')
          .setLabel('Active Time?')
          .setStyle('SHORT') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
          .setMinLength(4)
          .setMaxLength(10)
          .setPlaceholder('Example: 7/24 | Örnek: 7/24')
          .setRequired(true),
        new TextInputComponent() // We create a Text Input Component
          .setCustomId('botid')
          .setLabel('Bot ID?')
          .setStyle('SHORT') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
          .setMinLength(1)
          .setMaxLength(18)
          .setPlaceholder('Example: 123... | Örnek: 123...')
          .setRequired(true),

        new TextInputComponent() // We create a Text Input Component
          .setCustomId('botprefix')
          .setLabel('Bot Prefix ?')
          .setStyle('SHORT') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
          .setMinLength(1)
          .setMaxLength(5)
          .setPlaceholder('Example: / | Örnek: /')
          .setRequired(true)

        /*
        new TextInputComponent() // We create a Text Input Component
          .setCustomId('botplatform')
          .setLabel('Platform?')
          .setStyle('SHORT') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
          .setMinLength(1)
          .setMaxLength(15)
          .setPlaceholder('Example: VDS | Örnek: VDS')
          .setRequired(true)
        */
      );
    // const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });
    /*collector.on('collect', async i => {
      if (i.customId === 'modapp') {
        await i.deferUpdate();
        //i.reply({*/
    showModal(modal, {
      client: client, // Client to show the Modal through the Discord API.
      interaction: interaction // Show the modal with interaction data.
    })

  }
  if (interaction.customId === "basvuru-onay") {
    const c = db.fetch(`bot`)
    interaction.reply("**Bot Onaylandı!**")
    await interaction.guild.roles.fetch() //optional - put it if the role is valid, but is not cached
    let role = interaction.guild.roles.cache.find(role => role.name === 'Verified Bots')

    const member = interaction.guild.members.cache.get(c.botid)

    member.roles.add(role)
    client.channels.cache.get("945409365870014475").send(`> <:Ceixsam22:853245317805899786> <@${c.botsahip}>(${c.botisim}) Bot Add Request has Accepted! | Bot Ekleme Başvurusu Onaylandı!`)
  }
  if (interaction.customId === "basvuru-red") {
    const c = db.fetch(`basvuru`)
    interaction.reply("**Bot Reddedildi!**")
    await interaction.guild.roles.fetch() //optional - put it if the role is valid, but is not cached
    let role = interaction.guild.roles.cache.find(role => role.name === 'Verified Bots')

    const member = interaction.guild.members.cache.get(c.botid)

    //member.roles.add(role)
    client.channels.cache.get("945409365870014475").send(`> <:Ceixsam23:853245321820110869> <@${c.botsahip}>(${c.botisim}) Bot Add Request has Declined! | Bot Ekleme Başvurusu Reddedildi!`)
  }
})
const mySecret = process.env['token']


client.login(mySecret)
//const mySecret = process.env['token']

