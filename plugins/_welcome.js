import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.isGroup || !m.messageStubType) return true;

  const stubParams = m.messageStubParameters || [];
  if (!Array.isArray(stubParams) || stubParams.length === 0) return true;

  let userJid = stubParams[0];
  if (!userJid) return true;
  let username = userJid.split('@')[0];
  let mention = '@' + username;

  let memberCount = groupMetadata.participants?.length || participants.length || 0;
  if (m.messageStubType == 27) memberCount++;
  if (m.messageStubType == 28 || m.messageStubType == 32) memberCount = Math.max(0, memberCount - 1);

  let avatar;
  try {
    avatar = await conn.profilePictureUrl(userJid, 'image');
  } catch {
    avatar = 'https://files.catbox.moe/emwtzj.png';
  }

  let background = encodeURIComponent('https://files.catbox.moe/w1r8jh.jpeg');
  let guildName = encodeURIComponent(groupMetadata.subject);

  let welcomeApiUrl = `https://gokublack.xyz/canvas/welcome?background=${background}&text1=Hola%20${encodeURIComponent(username)}&text2=Bienvenido%20a%20${guildName}&text3=Ahora%20somos%20${memberCount}%20miembros&avatar=${encodeURIComponent(avatar)}`;
  let goodbyeApiUrl = `https://gokublack.xyz/canvas/welcome?background=${background}&text1=Adiós%20${encodeURIComponent(username)}&text2=Saliste%20de%20${guildName}&text3=Ahora%20quedan%20${memberCount}%20miembros&avatar=${encodeURIComponent(avatar)}`;

  async function fetchImage(url, fallbackUrl) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Error al descargar imagen');
      return await res.buffer();
    } catch {
      const fallbackRes = await fetch(fallbackUrl);
      return await fallbackRes.buffer();
    }
  }

  let chat = global.db.data.chats[m.chat] || {};
  if (typeof chat.welcome === 'undefined') chat.welcome = true;

  let txtWelcome = 'ゲ◜៹ New Member ៹◞ゲ';
  let txtGoodbye = 'ゲ◜៹ Bye Member ៹◞ゲ';

  let bienvenida = `❀ *Bienvenido* a ${groupMetadata.subject}\n✰ ${mention}\n${global.welcom1 || ''}\n✦ Ahora somos ${memberCount} Miembros.\n•(=^●ω●^=)• Disfruta tu estadía en el grupo!\n> ✐ Usa *#help* para ver comandos.`;
  let bye = `❀ *Adiós* de ${groupMetadata.subject}\n✰ ${mention}\n${global.welcom2 || ''}\n✦ Ahora somos ${memberCount} Miembros.\n•(=^●ω●^=)• ¡Te esperamos pronto!`;

  let dev = global.dev || '';
  let redes = global.redes || '';
  let fkontak = global.fkontak || {};

  if (chat.welcome) {
    if (m.messageStubType == 27) {
      let imgBuffer = await fetchImage(welcomeApiUrl, avatar);
      try {
        await conn.sendMini?.(m.chat, txtWelcome, dev, bienvenida, imgBuffer, imgBuffer, redes, fkontak);
      } catch {
        await conn.sendMessage(m.chat, { image: imgBuffer, caption: bienvenida, mentions: [userJid] }, { quoted: m });
      }
    } else if (m.messageStubType == 28 || m.messageStubType == 32) {
      let imgBuffer = await fetchImage(goodbyeApiUrl, avatar);
      try {
        await conn.sendMini?.(m.chat, txtGoodbye, dev, bye, imgBuffer, imgBuffer, redes, fkontak);
      } catch {
        await conn.sendMessage(m.chat, { image: imgBuffer, caption: bye, mentions: [userJid] }, { quoted: m });
      }
    }
  }
}