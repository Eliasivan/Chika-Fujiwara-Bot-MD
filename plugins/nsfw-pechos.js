import axios from 'axios';

const handler = async (m, { conn, command }) => {
  if (!db.data.chats[m.chat].nsfw && m.isGroup) {
    return m.reply('✏ El comando está desactivado');
  }

  conn.reply(m.chat, `😈 *Enviando ${command}...*`, m);

  try {
    await conn.sendMessage(m.chat, {
      react: { text: '👅', key: m.key },
    });

    const response = await axios.get('https://api-rho-five-87.vercel.app/random/archive', {
      responseType: 'arraybuffer',
    });

    const imageBuffer = Buffer.from(response.data);

    await conn.sendMessage(
      m.chat,
      {
        image: imageBuffer,
        caption: 'Toma tus pechos pajero 🥵',
      },
      { quoted: m }
    );

    await conn.sendMessage(m.chat, {
      react: { text: '💦', key: m.key },
    });

  } catch (err) {
    await conn.sendMessage(m.chat, {
      react: { text: '❌', key: m.key },
    });
    m.reply('❌ Ocurrió un error al obtener la imagen. Intenta de nuevo más tarde.');
  }
};

handler.command = ['tetas', 'pechos'];
handler.help = ['Nsfw'];
handler.tags = ['imagen'];
handler.group = true;

export default handler;