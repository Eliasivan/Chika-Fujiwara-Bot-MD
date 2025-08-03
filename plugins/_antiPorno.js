const pornRegex = /(pornhub\.com|xvideos\.com|xnxx\.com|youporn\.com|redtube\.com|hentaicloud\.com|hentaiplay\.net|rule34\.xxx|hentai\.com|spankbang\.com|tnaflix\.com|adultfriendfinder\.com|3movs\.com|javhub\.net|javmost\.com|m\.pornhub\.com|xxx|pussy|sex|boobs|ass|milf|hentai|bdsm|shemale|anal|cumshot|furry|futa|futanari|deepthroat|fisting|erome\.com|leakgirls\.com|onlyfans\.com|erotic)/i;

export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner, participants }) {
  if (!m.isGroup) return;
  if (isAdmin || isOwner || m.fromMe || isROwner) return;

  let chat = global.db.data.chats[m.chat];
  let user = `@${m.sender.split('@')[0]}`;
  let isPornLink = pornRegex.test(m.text);

  if (!chat.antiPorno || !isPornLink) return;

  let delet = m.key.participant;
  let bang = m.key.id;
  const groupAdmins = participants.filter(p => p.admin);
  const listAdmin = groupAdmins.map((v, i) => `*» ${i + 1}. @${v.id.split('@')[0]}*`).join('\n');

  if (!isBotAdmin) {
    return conn.sendMessage(m.chat, {
      text: `⚠️ El *modo antiPorno* está activado, pero no soy admin y no puedo eliminar a los infractores.\n\n👮 Admins:\n${listAdmin}`,
      mentions: groupAdmins.map(v => v.id)
    }, { quoted: m });
  }

  await conn.sendMessage(m.chat, {
    text: `🚫 *Contenido prohibido detectado*\n\n${user} ha compartido contenido +18, y será expulsado del grupo por romper las reglas.`,
    mentions: [m.sender]
  }, { quoted: m });

  // Borrar el mensaje primero
  await conn.sendMessage(m.chat, {
    delete: {
      remoteJid: m.chat,
      fromMe: false,
      id: bang,
      participant: delet
    }
  });

  // Expulsar
  await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');

  return !0;
}
