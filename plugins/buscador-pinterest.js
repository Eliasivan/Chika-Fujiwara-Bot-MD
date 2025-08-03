/*
• Felix Manuel 
- Créditos a quien lo merece ~
🌸 Adaptado y embellecido para Ruby Hoshino por Dioneibi-rip
*/

import fetch from 'node-fetch';
import baileys from '@whiskeysockets/baileys';

const newsletterJid = '120363335626706839@newsletter';
const newsletterName = '⏤͟͞ू⃪፝͜⁞⟡『 𝐑𝐮𝐛𝐲 𝐇𝐨𝐬𝐡𝐢𝐧𝐨 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 』࿐⟡';
const wm = '🌸 Ruby-Hoshino Bot — powered by Dioneibi-rip';
const icons = 'https://i.imgur.com/Xs41WOr.jpg';
const channel = 'https://github.com/Dioneibi-rip/Ruby-Hoshino-Bot';

async function sendAlbumMessage(jid, medias, options = {}) {
  if (typeof jid !== "string") throw new TypeError(`jid must be string, received: ${jid}`);
  if (medias.length < 2) throw new RangeError("Se necesitan al menos 2 imágenes para un álbum");

  const caption = options.text || options.caption || "";
  const delay = !isNaN(options.delay) ? options.delay : 500;
  delete options.text;
  delete options.caption;
  delete options.delay;

  const album = baileys.generateWAMessageFromContent(
    jid,
    { messageContextInfo: {}, albumMessage: { expectedImageCount: medias.length } },
    {}
  );

  await conn.relayMessage(album.key.remoteJid, album.message, { messageId: album.key.id });

  for (let i = 0; i < medias.length; i++) {
    const { type, data } = medias[i];
    const img = await baileys.generateWAMessage(
      album.key.remoteJid,
      { [type]: data, ...(i === 0 ? { caption } : {}) },
      { upload: conn.waUploadToServer }
    );
    img.message.messageContextInfo = {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid,
        newsletterName,
        serverMessageId: -1
      }
    };
    await conn.relayMessage(img.key.remoteJid, img.message, { messageId: img.key.id });
    await baileys.delay(delay);
  }
  return album;
}

const handler = async (m, { conn, text, usedPrefix, command }) => {
  const name = conn.getName(m.sender);

  if (!text) {
    return conn.reply(m.chat,
      `🌸 *Onii-chan... nani sagashitai no?* (✿◕‿◕)\n\n` +
      `💡 Uso correcto:\n\`${usedPrefix + command} Shinobu aesthetic\``, m);
  }

  await m.react('🔍');
  conn.reply(m.chat, '⏳ *Buscando imágenes súper kawaii para ti, onii-chan... espera un momentito~* 💕', m, {
    contextInfo: {
      mentionedJid: [m.sender],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid,
        newsletterName,
        serverMessageId: -1
      },
      externalAdReply: {
        title: packname,
        body: wm,
        thumbnail: icons,
        sourceUrl: channel,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  });

  try {
    const res = await fetch(`https://api.dorratz.com/v2/pinterest?q=${encodeURIComponent(text)}`);
    const data = await res.json();

    if (!Array.isArray(data) || data.length < 2) {
      return conn.reply(m.chat, '💦 *Gomen... No encontré suficientes imágenes para mostrarte un álbum bonito, onii-chan~*', m);
    }

    const images = data.slice(0, 10).map(img => ({
      type: "image",
      data: { url: img.image_large_url }
    }));

    const caption = `🌸 *Imágenes encontradas para:* 『 ${text} 』\n🖼️ Aquí tienes tu álbum mágico, ${name}-chan~`;

    await sendAlbumMessage(m.chat, images, { caption, quoted: m });
    await m.react('✨');

  } catch (error) {
    console.error(error);
    await m.react('❌');
    conn.reply(m.chat, '😿 *Shimatta... ocurrió un error mientras buscaba en Pinterest, onii-chan.*', m);
  }
};

handler.help = ['pinterest']
handler.command = ['pinterest', 'pin']
handler.tags = ['dl']

export default handler
