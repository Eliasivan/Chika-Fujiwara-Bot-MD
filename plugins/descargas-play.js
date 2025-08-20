import yts from "yt-search";
import fetch from "node-fetch";

const SIZE_LIMIT_MB = 100;

const handler = async (m, { conn, text, command }) => {
  const name = conn.getName(m.sender);

  if (!text) {
    return conn.reply(
      m.chat,
      `Necesito que me digas el nombre de un video o me pegues el link de YouTube\n\n✨ *Ejemplos:*\n.play Anuel sola remix\n.play https://youtu.be/xxx`,
      m
    );
  }

  await m.react("🕝");

  const search = await yts(text);
  if (!search?.all || search.all.length === 0) {
    return conn.reply(m.chat, `*No encontré nada con:* "${text}"`, m);
  }

  const video = search.all[0];

  const caption = `
🍓 *Título:* ${video.title}
📏 *Duración:* ${video.duration.timestamp}
👁️ *Vistas:* ${video.views.toLocaleString()}
🎨 *Autor:* ${video.author.name}
📍 *URL:* ${video.url}`.trim();

  await conn.sendMessage(
    m.chat,
    { image: { url: video.thumbnail }, caption },
    { quoted: m }
  );

  try {
    if (command === "play" || command === "playaudio" || command === "ytmp3doc") {
      const apiUrl = `https://gokublack.xyz/download/ytmp3?url=${encodeURIComponent(video.url)}`;
      const res = await fetch(apiUrl).then(r => r.json());

      const download = res.data?.download;
      if (!res.status || !download) {
        return conn.reply(m.chat, `❌ Error al obtener audio.`, m);
      }

      if (command === "ytmp3doc") {
        await conn.sendMessage(
          m.chat,
          {
            document: { url: download },
            mimetype: "audio/mpeg",
            fileName: `${video.title}.mp3`
          },
          { quoted: m }
        );
        await m.react("📄");
      } else {
        await conn.sendMessage(
          m.chat,
          {
            audio: { url: download },
            mimetype: "audio/mpeg",
            fileName: `${video.title}.mp3`,
            ptt: true
          },
          { quoted: m }
        );
        await m.react("🎶");
      }
    } else if (command === "play2" || command === "playvid" || command === "playvideo") {
      const apiUrl = `https://api.sylphy.xyz/download/ytmp4?url=${encodeURIComponent(video.url)}&apikey=sylph-30fc019324`;
      const res = await fetch(apiUrl).then(r => r.json());

      if (!res.status || !res.res?.url) {
        return conn.reply(m.chat, `❌ Error al obtener video.`, m);
      }

      const head = await fetch(res.res.url, { method: "HEAD" });
      const sizeMB = parseInt(head.headers.get("content-length") || "0") / (1024 * 1024);
      const asDocument = sizeMB > SIZE_LIMIT_MB;

      await conn.sendMessage(
        m.chat,
        {
          video: { url: res.res.url },
          caption: `⚔ *Aquí está tu video guerrero*`,
          fileName: `${res.res.title}.mp4`,
          mimetype: "video/mp4"
        },
        { quoted: m, ...(asDocument ? { asDocument: true } : {}) }
      );
      await m.react("🎥");
    }
  } catch (e) {
    console.error(e);
    return conn.reply(m.chat, `❌ Error inesperado:\n\`\`\`${e.message}\`\`\``, m);
  }
};

handler.help = ["play", "playaudio", "ytmp3doc", "play2", "playvid", "playvideo"];
handler.tags = ["descargas"];
handler.command = ["play", "playaudio", "ytmp3doc", "play2", "playvid", "playvideo"];
handler.register = true;
handler.limit = true;

export default handler;