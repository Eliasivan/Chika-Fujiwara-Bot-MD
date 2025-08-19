import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botNumber = '' //Ejemplo: 573218138672

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.owner = [
// <-- Número @s.whatsapp.net -->
  ['595972157130', 'Rayo', true],

// <-- Número @lid -->
  ['200141197844495', 'Dioneibi', true],
  ['174560573964411', 'Rayo-ofc', true]
];

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.mods = []
global.suittag = ['595972157130']
global.prems = []

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.libreria = 'Baileys'
global.baileys = 'V 6.7.16' 
global.languaje = 'Español'
global.vs = '2.2.0'
global.nameqr = 'Goku-Black-Bot-MD'
global.namebot = '꒰ 🥥 ꒱ؘ Goku-Black-Bot-MD ☄ ࿐ ࿔*:･ﾟ'
global.sessions = 'Sessions'
global.jadi = 'JadiBots' 
global.Jadibts = true

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.packsticker = '𝐆𝐨𝐤𝐮-𝐁𝐥𝐚𝐜𝐤-𝐁𝐨𝐭-𝐌𝐃 𖧷'
global.packname = '𝐆𝐨𝐤𝐮-𝐁𝐥𝐚𝐜𝐤-𝐁𝐨𝐭-𝐌𝐃 💥'
global.author = 'ꭈׁׅɑׁׅᨮׁׅ֮ᨵׁׅׅ'
global.wm = 'ᘜOKᑌ-ᗷᒪᗩᑕK-ᗷOT-ᗰᗪ ＼ʕ •ᴥ•ʔ／'
global.titulowm = 'ɢᴏᴋᴜ-ʙʟᴀᴄᴋ-ʙᴏᴛ-ᴍᴅ ➶➴'
global.titulowm2 = '𝙂𝙤𝙠𝙪-𝘽𝙡𝙖𝙘𝙠-𝘽𝙤𝙩-𝙈𝘿 ☉'
global.igfg = '𝘎𝘖𝘒𝘜-𝘉𝘓𝘈𝘊𝘒-𝘉𝘖𝘛-𝘔𝘋 💫'
global.botname = '𝖦𝖮𝖪𝖴-𝖡𝖫𝖠𝖢𝖪-𝖡𝖮𝖳-𝖬𝖣'
global.dev = 'Ｒａｙｏ Ｏｆｃ'
global.textbot = '𝑮𝒐𝒌𝒖-𝑩𝒍𝒂𝒄𝒌-𝑩𝒐𝒕-𝑴𝑫 ☄︎'
global.gt = '𝐺𝑜𝑘𝑢-𝐵𝑙𝑎𝑐𝑘-𝐵𝑜𝑡-𝑀𝐷 💥'
global.namechannel = '𝑮𝑶𝑲𝑼-𝑩𝑳𝑨𝑪𝑲-𝑩𝑶𝑻-𝑴𝑫'
global.etiqueta = 'ˑ 𓈒 𐔌 Rayo ͡꒱ ۫'


//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.moneda = 'Ki'
global.welcom1 = '❍ Edita Con El Comando setwelcome'
global.welcom2 = '❍ Edita Con El Comando setbye'
global.banner = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1747289219876.jpeg'
global.avatar = 'https://qu.ax/RYjEw.jpeg'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.gp1 = ''
global.comunidad1 = ''
global.channel = ''
global.channel2 = ''
global.md = 'https://github.com/Dioneibi-rip/Ruby-Hoshino-Bot'
global.correo = 'dioneibipaselomendes@gmail.com'
global.cn ='https://whatsapp.com/channel/0029VakLbM76mYPPFL0IFI3P';

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.catalogo = fs.readFileSync('./src/catalogo.jpg');
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: '120363335626706839@newsletter',
}

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment   

global.rpg = {
  emoticon(string) {
    string = string.toLowerCase();
    const emot = {
      level: '🌟 Nivel',
      coin: '💸 Coin',
      exp: '✨ Experiencia',
      bank: '🏦 Banco',
      diamond: '💎 Diamante',
      health: '❤️ Salud',
      kyubi: '🌀 Magia',
      joincount: '💰 Token',
      emerald: '♦️ Esmeralda',
      stamina: '⚡ Energía',
      role: '⚜️ Rango',
      premium: '🎟️ Premium',
      pointxp: '📧 Puntos Exp',
      gold: '👑 Oro',
      iron: '⛓️ Hierro',
      coal: '🌑 Carbón',
      stone: '🪨 Piedra',
      potion: '🥤 Poción',
    };
    const results = Object.keys(emot).map((v) => [v, new RegExp(v, 'gi')]).filter((v) => v[1].test(string));
    if (!results.length) return '';
    else return emot[results[0][0]];
  }};
global.rpgg = { 
  emoticon(string) {
    string = string.toLowerCase();
    const emott = {
      level: '🌟',
      coin: '💸',
      exp: '✨',
      bank: '🏦',
      diamond: '💎',
      health: '❤️',
      kyubi: '🌀',
      joincount: '💰',
      emerald: '♦️',
      stamina: '⚡',
      role: '⚜️',
      premium: '🎟️',
      pointxp: '📧',
      gold: '👑',
      iron: '⛓️',
      coal: '🌑',
      stone: '🪨',
      potion: '🥤',
    };
    const results = Object.keys(emott).map((v) => [v, new RegExp(v, 'gi')]).filter((v) => v[1].test(string));
    if (!results.length) return '';
    else return emott[results[0][0]];
  }};  

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})
