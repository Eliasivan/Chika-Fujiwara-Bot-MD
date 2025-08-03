import fetch from 'node-fetch';

const newsletterJid = '120363335626706839@newsletter';
const newsletterName = '⟡⪻ Ruby-Hoshino チャンネル ⪼⟡';

const handler = async (m, { conn, text, args }) => {
  const contextInfo = {
    mentionedJid: [m.sender],
    isForwarded: true,
    forwardingScore: 999,
    forwardedNewsletterMessageInfo: {
      newsletterJid,
      newsletterName,
      serverMessageId: -1,
    },
    externalAdReply: {
      title: packname,
      body: dev,
      thumbnail: icons,
      sourceUrl: redes,
      mediaType: 1,
      renderLargerThumbnail: false,
    },
  };

  try {
    if (!args[0]) {
      return conn.reply(
        m.chat,
        `🌺 *${conn.getName(m.sender)}... falta el link~*\n\nPor favor, pega un enlace de TikTok válido. 🧸\n\n📌 *Ejemplo:* \n/tiktok https://www.tiktok.com/@usuario/video/123456`,
        m,
        { contextInfo }
      );
    }

    if (!/(?:https?:\/\/)?(?:www\.|vm\.|vt\.|t)?\.?tiktok\.com\/[^\s&]+/i.test(text)) {
      return conn.reply(
        m.chat,
        `❌ *El enlace de TikTok no es válido, ${conn.getName(m.sender)}-san.*\n\nVerifica que sea una URL correcta.`,
        m,
        { contextInfo }
      );
    }

    await m.react('🕒');

    const api = `https://api.sylphy.xyz/download/tiktok?url=${args[0]}&apikey=sylphy`;
    const res = await fetch(api);
    const json = await res.json();

    if (!json.status) throw new Error('No se pudo obtener el contenido.');

    const { title, duration, author } = json.data;
    const dl = json.dl;
    const type = json.type;

    const caption = `
╭─❍「 TikTok Downloader 」
│📌 *Título:* ${title}
│👤 *Autor:* ${author}
│🕒 *Duración:* ${duration}s
╰───────────────✿`.trim();

    if (type === 'video') {
      await conn.sendMessage(
        m.chat,
        {
          video: { url: dl.url },
          caption,
          mimetype: 'video/mp4',
          fileName: 'tiktok.mp4',
        },
        { quoted: m, contextInfo }
      );
    } else if (type === 'image') {
      if (Array.isArray(dl.url)) {
        for (let i = 0; i < dl.url.length; i++) {
          await conn.sendMessage(
            m.chat,
            {
              image: { url: dl.url[i] },
              caption: i === 0 ? caption : '',
              fileName: `tiktok_${i + 1}.jpg`,
            },
            { quoted: m, contextInfo }
          );
        }
      } else {
        await conn.sendMessage(
          m.chat,
          {
            image: { url: dl.url },
            caption,
            fileName: 'tiktok.jpg',
          },
          { quoted: m, contextInfo }
        );
      }
    } else {
      throw new Error('Tipo de contenido no soportado. 💢');
    }

    await m.react('✅');
  } catch (e) {
    console.error(e);
    return conn.reply(
      m.chat,
      `⚠️ *Ocurrió un error inesperado...*\n\`\`\`${e.message}\`\`\``,
      m,
      { contextInfo }
    );
  }
};

handler.help = ['tiktok'];
handler.tags = ['descargas'];
handler.command = ['tt', 'tiktok', 'ttdl'];
handler.limit = true;
handler.coin = 2
handler.register = true;

export default handler;
