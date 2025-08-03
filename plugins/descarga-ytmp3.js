import fetch from 'node-fetch';

const newsletterJid  = '120363335626706839@newsletter';
const newsletterName = '⏤͟͞ू⃪፝͜⁞⟡『 𝐓͢ᴇ𝙖፝ᴍ⃨ 𝘾𝒉꯭𝐚𝑛𝑛𝒆𝑙: 𝑹ᴜ⃜ɓ𝑦-𝑯ᴏ𝒔𝑯𝙞꯭𝑛𝒐 』࿐⟡';

var handler = async (m, { conn, args, usedPrefix, command }) => {
  const emoji = '🎵';
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
      title: wm,
      body: dev,
      thumbnail: icons,
      sourceUrl: redes,
      mediaType: 1,
      renderLargerThumbnail: false
    }
  };

  if (!args[0]) {
    return conn.reply(
      m.chat,
      `${emoji} *¡Oh no~!* pásame un enlace de YouTube para traer el audio.\n\nUso:\n\`${usedPrefix + command} https://youtu.be/KHgllosZ3kA\``,
      m,
      { contextInfo, quoted: m }
    );
  }

  try {
    await conn.reply(
      m.chat,
      `🌸 *Procesando tu petición...*\nUn momento, senpai~ 🎧`,
      m,
      { contextInfo, quoted: m }
    );

    const url = args[0];
    const apiUrl = `https://dark-core-api.vercel.app/api/download/YTMP3?key=api&url=${encodeURIComponent(url)}`;
    const res = await fetch(apiUrl);
    const json = await res.json();

    if (!json.status || !json.download) {
      return conn.reply(
        m.chat,
        `❌ *No pude descargar el audio.*\nRazón: ${json.message || 'Respuesta inválida de la API.'}`,
        m,
        { contextInfo, quoted: m }
      );
    }

    const audioRes = await fetch(json.download);
    const audioBuffer = await audioRes.buffer();

    const caption = `
╭───[ 𝚈𝚃𝙼𝙿𝟹 • 🎶 ]───⬣
📌 *Título:* ${json.title}
📁 *Formato:* ${json.format}
📎 *Fuente:* ${url}
╰────────────────⬣`;

    await conn.sendMessage(
      m.chat,
      {
        audio: audioBuffer,
        mimetype: 'audio/mpeg',
        fileName: `${json.title}.mp3`,
        ptt: false,
        caption
      },
      { contextInfo, quoted: m }
    );

  } catch (e) {
    console.error(e);
    await conn.reply(
      m.chat,
      `❌ *Ocurrió un error al procesar el audio.*\nDetalles: ${e.message}`,
      m,
      { contextInfo, quoted: m }
    );
  }
};

handler.help = ['ytmp3'].map(v => v + ' <link>');
handler.tags = ['descargas'];
handler.command = ['ytmp3', 'ytaudio', 'mp3'];
handler.register = true;
handler.limit = true;
handler.coin = 2;

export default handler;
