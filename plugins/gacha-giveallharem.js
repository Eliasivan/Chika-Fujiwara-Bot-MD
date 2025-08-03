import { promises as fs } from 'fs';

const charactersFilePath = './src/database/characters.json';
const confirmaciones = new Map();

async function loadCharacters() {
  const data = await fs.readFile(charactersFilePath, 'utf-8');
  return JSON.parse(data);
}

async function saveCharacters(characters) {
  await fs.writeFile(charactersFilePath, JSON.stringify(characters, null, 2), 'utf-8');
}

let handler = async (m, { conn }) => {
  const sender = m.sender;
  const mentioned = m.mentionedJid?.[0];

  if (!mentioned) return m.reply('✿ Debes mencionar a alguien para regalarle todas tus waifus.');
  if (mentioned === sender) return m.reply('✿ No puedes regalarte tus propias waifus.');

  const characters = await loadCharacters();
  const myWaifus = characters.filter(c => c.user === sender);

  if (myWaifus.length === 0) return m.reply('✿ No tienes waifus para regalar.');

  const valorTotal = myWaifus.reduce((acc, w) => acc + (parseInt(w.value) || 0), 0);

  // Guardar solicitud en mapa para confirmar
  confirmaciones.set(sender, {
    waifus: myWaifus.map(c => c.id),
    receptor: mentioned,
    valorTotal
  });

  const textoConfirmacion = `「✐」 @${sender.split('@')[0]}, ¿Estás seguro que deseas regalar todos tus personajes a *@${mentioned.split('@')[0]}*?

❏ Personajes a regalar: *${myWaifus.length}*
❏ Valor total: *${valorTotal.toLocaleString()}*

✐ Para confirmar responde a este mensaje con "*Aceptar*".
> Esta acción no se puede deshacer, revisa bien los datos antes de confirmar.`;

  await conn.sendMessage(m.chat, {
    text: textoConfirmacion,
    mentions: [sender, mentioned]
  }, { quoted: m });
};

handler.before = async function (m, { conn }) {
  const data = confirmaciones.get(m.sender);
  if (!data) return;

  if (m.text?.trim().toLowerCase() === 'aceptar') {
    confirmaciones.delete(m.sender);

    const characters = await loadCharacters();
    let regalados = 0;

    for (const char of characters) {
      if (data.waifus.includes(char.id) && char.user === m.sender) {
        char.user = data.receptor;
        char.status = "Reclamado";
        regalados++;
      }
    }

    await saveCharacters(characters);

    return conn.sendMessage(m.chat, {
      text: `「✐」 Has regalado con éxito todos tus personajes a *@${data.receptor.split('@')[0]}*!\n\n> ❏ Personajes regalados: *${regalados}*\n> ⴵ Valor total: *${data.valorTotal.toLocaleString()}*`,
      mentions: [data.receptor]
    }, { quoted: m });
  }
};

handler.help = ['giveallharem @user'];
handler.tags = ['gacha'];
handler.command = ['giveallharem', 'regalarharem'];
handler.group = true;
handler.register = true;

export default handler;
