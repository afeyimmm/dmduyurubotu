const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { fetchMembers } = require('../utils/fetchMembers');
const { logToFile } = require('../utils/logger');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dmduyur')
    .setDescription('Embed ile DM gönder')
    .addStringOption(opt =>
      opt.setName('baslik').setDescription('Başlık').setRequired(true))
    .addStringOption(opt =>
      opt.setName('icerik').setDescription('Açıklama').setRequired(true)),

  async execute(interaction) {
    const baslik = interaction.options.getString('baslik');
    const icerik = interaction.options.getString('icerik');
    const guild = interaction.guild;

    await interaction.reply({ content: '📨 Gönderiliyor...', ephemeral: true });

    const ids = await fetchMembers(guild);
    const embed = new EmbedBuilder()
      .setTitle(baslik)
      .setDescription(icerik)
      .setColor(0x00AEFF)
      .setTimestamp();

    for (const id of ids) {
      try {
        const user = await interaction.client.users.fetch(id);
        await user.send({ embeds: [embed] });
        logToFile('success.log', `DM gönderildi: ${user.tag}`);
        await new Promise(r => setTimeout(r, 1000));
      } catch {
        logToFile('failed.log', `DM gönderilemedi: ${id}`);
      }
    }

    await interaction.editReply('✅ Tamamlandı.');
  }
};