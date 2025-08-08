import axios from 'axios';
import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
  const url = args[0];
  if (!url) return m.reply('✏ Ingrese un enlace válido de YouTube (no Shorts).');
  if (!url.includes('youtu')) return m.reply('❌ No es un enlace válido de YouTube.');

  try {
    m.reply('*_⏳ Procesando Video... ⏳_*');
    m.react('🥵');

    const api = `https://gokublack.xyz/download/ytmp4?url=${encodeURIComponent(url)}`;
    const { data } = await axios.get(api);

    if (!data || !data.estado || !data.datos || !data.datos.urlDescarga) {
      return m.reply('❌ No se pudo obtener el video. Intenta con otro enlace.');
    }

    const { titulo = 'Video sin título', formato = 'MP4', urlDescarga } = data.datos;

    try {
      const head = await fetch(urlDescarga, { method: 'HEAD' });
      const fileSizeBytes = parseInt(head.headers.get('content-length') || '0', 10);
      if (isNaN(fileSizeBytes) || fileSizeBytes === 0) throw new Error();
      const fileSizeMB = fileSizeBytes / (1024 * 1024);
      if (fileSizeMB > 100) {
        return m.reply(`❌ El video es muy pesado (${fileSizeMB.toFixed(2)} MB). Máximo permitido: 100 MB.`);
      }
    } catch {
      return m.reply('❌ No se pudo verificar el tamaño del video.');
    }

    const caption = `*◉—⌈📥 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐃𝐋 📥⌋—◉*
❏ *𝚃𝙸𝚃𝚄𝙻𝙾:* ${titulo}
❏ *Formato:* ${formato}`;

    await conn.sendMessage(
      m.chat,
      { video: { url: urlDescarga }, caption },
      { quoted: m }
    );

  } catch {
    m.reply('❌ Ocurrió un error al procesar el video.');
  }
};

handler.command = ['ytmp4'];
handler.help = ['ytmp4 <url>'];
handler.tags = ['downloader'];
handler.limit = false;

export default handler;