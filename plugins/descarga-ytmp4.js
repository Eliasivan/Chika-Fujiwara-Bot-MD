import axios from 'axios';
import fetch from 'node-fetch';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  const url = args[0];

  if (!url) {
    return m.reply(`❌ Por favor proporciona un enlace de YouTube.\n\n*Uso:* ${usedPrefix}${command} <enlace>`);
  }

  if (!url.includes('youtu')) {
    return m.reply('❌ Ese no parece un enlace válido de YouTube.');
  }

  try {
    m.reply('⏳ Procesando video, espera un momento...');

    const api = `https://gokublack.xyz/download/ytmp4?url=${encodeURIComponent(url)}`;
    const response = await axios.get(api);
    const result = response.data;

    if (!result || !result.status || !result.data || !result.data.downloadURL) {
      return m.reply('❌ No se pudo obtener el video. Intenta con otro enlace.');
    }

    const {
      title = 'Video sin título',
      format,
      downloadURL
    } = result.data;

    try {
      const head = await fetch(downloadURL, { method: 'HEAD' });
      const fileSizeBytes = parseInt(head.headers.get('content-length') || '0', 10);

      if (isNaN(fileSizeBytes) || fileSizeBytes === 0) {
        throw new Error();
      }

      const fileSizeMB = fileSizeBytes / (1024 * 1024);
      if (fileSizeMB > 100) {
        return m.reply(`❌ El video es muy pesado (${fileSizeMB.toFixed(2)} MB). WhatsApp permite máximo ~100 MB.`);
      }
    } catch {
      return m.reply('❌ No se pudo verificar el tamaño del video.');
    }

    const caption = `*◉—⌈📥 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐃𝐋 📥⌋—◉*
❏ *𝚃𝙸𝚃𝚄𝙻𝙾:* ${title}
❏ *Formato:* ${format}`;

    await conn.sendMessage(
      m.chat,
      {
        video: { url: downloadURL },
        caption
      },
      { quoted: m }
    );

  } catch {
    m.reply('❌ Ocurrió un error al procesar el video. Intenta de nuevo más tarde.');
  }
};

handler.command = ['ytmp4'];
handler.help = ['ytmp4 <url>'];
handler.tags = ['downloader'];
handler.limit = false;

export default handler;