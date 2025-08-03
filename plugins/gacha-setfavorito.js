import { promises as fs } from 'fs';

const charactersFilePath = './src/database/characters.json';
const userFavFilePath = './src/database/charactersfav.json';

async function loadCharacters() {
  const data = await fs.readFile(charactersFilePath, 'utf-8');
  return JSON.parse(data);
}

async function saveCharacters(characters) {
  await fs.writeFile(charactersFilePath, JSON.stringify(characters, null, 2), 'utf-8');
}

async function loadUserFavs() {
  try {
    const data = await fs.readFile(userFavFilePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

async function saveUserFavs(favs) {
  await fs.writeFile(userFavFilePath, JSON.stringify(favs, null, 2), 'utf-8');
}

let handler = async (m, { args }) => {
  if (!args[0]) return m.reply('✿ Debes escribir el nombre del personaje que deseas establecer como favorito.');

  let characters = await loadCharacters();
  let favs = await loadUserFavs();

  const characterName = args.join(' ').toLowerCase();
  const userId = m.sender;

  let character = characters.find(c => c.name.toLowerCase() === characterName);
  if (!character) return m.reply('✿ Personaje no encontrado.');

  if (favs[userId] && favs[userId] !== character.name) {
    let prevChar = characters.find(c => c.name === favs[userId]);
    if (prevChar && prevChar.favorites > 0) prevChar.favorites--;
  }

  character.favorites = (character.favorites || 0) + 1;
  favs[userId] = character.name;

  await saveCharacters(characters);
  await saveUserFavs(favs);

  await m.reply(`✐ Ahora *${character.name}* es tu personaje favorito!`);
};

handler.help = ['setfav <nombre>'];
handler.tags = ['anime'];
handler.command = ['setfav', 'setfavorito'];
handler.group = true;
handler.register = true;

export default handler;
