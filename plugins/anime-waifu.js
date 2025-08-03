import fetch from 'node-fetch';

const newsletterJid  = '120363335626706839@newsletter';
const newsletterName = '🌸『 Ruby-Hoshino Waifu Channel 』🌸';

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    const contextInfo = {
      mentionedJid: [m.sender],
      isForwarded: true,
      forwardingScore: 999,
      forwardedNewsletterMessageInfo: {
        newsletterJid,
        newsletterName,
        serverMessageId: -1
      },
      externalAdReply: {
        title: packname,
        body: dev,
        thumbnail: icons,
        sourceUrl: redes,
        mediaType: 1,
        renderLargerThumbnail: false
      }
    };

    await m.react('🌸');
    await conn.reply(m.chat, '🎀 *Buscando una waifu para ti... espera un momento~*', m, { contextInfo });

    let res = await fetch('https://api.waifu.pics/sfw/waifu');
    if (!res.ok) throw new Error('No se pudo obtener la waifu.');
    let json = await res.json();
    if (!json.url) throw new Error('Respuesta inválida.');

    const caption = `🌸 *Aquí tienes tu waifu, ${conn.getName(m.sender)}-chan~* 〰️\n\n✨ ¿Quieres otra waifu? Solo toca el botón de abajo~`;

    const buttons = [
      { buttonId: usedPrefix + command, buttonText: { displayText: '🔁 Siguiente waifu' }, type: 1 }
    ];

    await conn.sendMessage(
      m.chat,
      {
        image: { url: json.url },
        caption,
        footer: '🐾 Ruby Hoshino Bot',
        buttons,
        headerType: 4
      },
      { quoted: m, contextInfo }
    );

  } catch (e) {
    console.error(e);
    await conn.reply(m.chat, '❌ Lo siento, ocurrió un error al buscar tu waifu.', m);
  }
};

handler.help = ['waifu'];
handler.tags = ['anime'];
handler.command = ['waifu'];
handler.group = true;
handler.register = true;

export default handler;
