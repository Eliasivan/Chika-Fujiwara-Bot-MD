import yts from "yt-search";
import fetch from "node-fetch";
import { ogmp3 } from '../lib/youtubedl.js';

const SIZE_LIMIT_MB = 100;
const newsletterJid = '120363335626706839@newsletter';
const newsletterName = '⏤‏⃪ً፝͟͞⁡⁎⊡『 Ruby-Hoshino-Channel 』༿⊡';

const handler = async (m, { conn, text, command }) => {
  const name = conn.getName(m.sender);
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
      body: "🎿 Ruby Hoshino Downloader",
      thumbnail: icons,
      sourceUrl: redes,
      mediaType: 1,
      renderLargerThumbnail: false
    }
  };

  if (!text) {
    return conn.reply(m.chat,
      `🌸 *Konnichiwa ${name}-chan~!* Necesito que me digas el nombre de un video o me pegues el link de YouTube 💕\n\n✨ *Ejemplos:*\n.play Shinzou wo Sasageyo\n.play https://youtu.be/xxx`,
      m, { contextInfo });
  }

  await m.react("🕝");

  const search = await yts(text);
  if (!search?.all || search.all.length === 0) {
    return conn.reply(m.chat, `💦 *Gomen ne, no encontré nada con:* "${text}"`, m, { contextInfo });
  }

  const video = search.all[0];

  const caption = `
> 🍓 *Título:* ${video.title}
> 📏 *Duración:* ${video.duration.timestamp}
> 👁️ *Vistas:*  ${video.views.toLocaleString()}
> 🎨 *Autor:* ${video.author.name}
> 📍 *URL:* ${video.url}`.trim();

  await conn.sendMessage(m.chat, {
    image: { url: video.thumbnail },
    caption,
    contextInfo
  }, { quoted: m });

  try {
    if (command === "play") {
      const res = await ogmp3.download(video.url, '320', 'audio');

      if (!res.status) {
        return conn.reply(m.chat, `❌ Error de audio:\n📋 *Causa:* ${res.error}`, m, { contextInfo });
      }

      await conn.sendMessage(m.chat, {
        audio: { url: res.result.download },
        mimetype: "audio/mpeg",
        fileName: res.result.title + ".mp3",
        ptt: true
      }, { quoted: m });

      await m.react("🎶");

    } else if (command === "play2" || command === "playvid") {
      const res = await ogmp3.download(video.url, '360', 'video');

      if (!res.status) {
        return conn.reply(m.chat, `❌ Error de video:\n📋 *Causa:* ${res.error}`, m, { contextInfo });
      }

      const head = await fetch(res.result.download, { method: "HEAD" });
      const sizeMB = parseInt(head.headers.get("content-length") || "0") / (1024 * 1024);
      const asDocument = sizeMB > SIZE_LIMIT_MB;

      await conn.sendMessage(m.chat, {
        video: { url: res.result.download },
        caption: `🎥 *Listo ${name}-chan!* Aquí está tu video~`,
        fileName: res.result.title + ".mp4",
        mimetype: "video/mp4"
      }, {
        quoted: m,
        ...(asDocument ? { asDocument: true } : {})
      });

      await m.react("🎥");
    }
  } catch (e) {
    console.error(e);
    return conn.reply(m.chat, `❌ Error inesperado:\n\`\`\`${e.message}\`\`\``, m, { contextInfo });
  }
};

handler.help = ["play", "play2", "playvid"];
handler.tags = ["descargas"];
handler.command = ["play", "play2", "playvid"];
handler.register = true;
handler.limit = true;

export default handler;