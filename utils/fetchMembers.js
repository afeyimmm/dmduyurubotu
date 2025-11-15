async function fetchMembers(guild) {
  const members = await guild.members.fetch();
  return members.filter(m => !m.user.bot).map(m => m.id);
}
module.exports = { fetchMembers };