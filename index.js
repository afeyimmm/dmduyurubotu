require('dotenv').config();
const fs = require('fs');
const { Client, Collection, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.DirectMessages],
  partials: ['CHANNEL']
});

client.commands = new Collection();
const command = require('./commands/dmduyur');
client.commands.set(command.data.name, command);

client.once('ready', () => {
  console.log(`✅ Bot aktif: ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const ownerFile = './owner.json';
  const ownerData = JSON.parse(fs.readFileSync(ownerFile));
  if (!ownerData.ownerId) {
    ownerData.ownerId = interaction.user.id;
    fs.writeFileSync(ownerFile, JSON.stringify(ownerData, null, 2));
    await interaction.reply({ content: '👑 Owner olarak tanımlandın!', ephemeral: true });
    return;
  }

  if (interaction.user.id !== ownerData.ownerId) {
    await interaction.reply({ content: '⛔ Sadece owner kullanabilir.', ephemeral: true });
    return;
  }

  const command = client.commands.get(interaction.commandName);
  if (command) await command.execute(interaction);
});

client.login(process.env.TOKEN);