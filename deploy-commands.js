require('dotenv').config();
const { REST, Routes } = require('discord.js');
const { data } = require('./commands/dmduyur');

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  await rest.put(
    Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
    { body: [data.toJSON()] }
  );
  console.log('✅ Slash komut yüklendi.');
})();