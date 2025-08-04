import fetch from 'node-fetch';

let handler = async (m, { text }) => {
  if (!text) {
    return m.reply('${emoji} Ingresa un mensaje para enviar a la API.\n\nEjemplo: .bard Hola, ¿cómo estás?');
  }
m.react('☄');
  const url = `https://api-rho-five-87.vercel.app/ai/bard?text=${encodeURIComponent(text)}`;

  try {
    const res = await fetch(url);
    const json = await res.json();

    if (!json.result || !json.result.response) {
      return m.reply('#${emoji3} No se encontró la respuesta en el campo esperado.\n\n' + JSON.stringify(json));
    }

    m.reply(json.result.response.trim());

  } catch (e) {
    console.error('ERROR al conectar con la API:', e);
    m.reply('${emoji2} Error al conectar con la API:\n\n' + e.message);
  }
};

handler.command = ['bard'];
handler.help = ['bard <texto>'];
handler.tags = ['ai'];

export default handler;