import pkg from '@whiskeysockets/baileys'
import fs from 'fs'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = pkg

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
if (!Array.prototype.getRandom) {
  Array.prototype.getRandom = function () {
    return this[Math.floor(Math.random() * this.length)]
  }
}

global.getBuffer = async function getBuffer(url, options) {
  try {
    options = options || {}
    var res = await axios({
      method: "get",
      url,
      headers: {
        'DNT': 1,
        'User-Agent': 'GoogleBot',
        'Upgrade-Insecure-Request': 1
      },
      ...options,
      responseType: 'arraybuffer'
    })
    return res.data
  } catch (e) {
    return null
  }
}

const iconUrls = [
  "https://qu.ax/JvOxd.jpg",
  "https://qu.ax/uUPrj.jpg",
  "https://qu.ax/cCggi.jpg",
  "https://qu.ax/dwRTX.jpg",
  "https://qu.ax/gYwnW.jpg"
]
const iconUrl = pickRandom(iconUrls)
global.icono = await getBuffer(iconUrl)

global.creador = 'Wa.me/18294868853'
global.asistencia = 'Wa.me/18294868853'
global.namechannel = '⏤͟͞ू⃪፝͜⁞⟡『 𝐓͢ᴇ𝙖፝ᴍ⃨ 𝘾𝒉꯭𝐚𝑛𝑛𝒆𝑙: g᥆kᥙ-ᑲᥣᥲᥴk-ᑲ᥆𝗍-mძ 』࿐⟡'
global.namechannel2 = '⟡『 𝐓𝐞𝐚𝐦 𝐂𝐡𝐚𝐧𝐧𝐞𝐥: g᥆kᥙ-ᑲᥣᥲᥴk-ᑲ᥆𝗍-mძ 』⟡'
global.namegrupo = '⏤͟͞ू⃪ g᥆kᥙ-ᑲᥣᥲᥴk-ᑲ᥆𝗍-mძ ⌬⃝𓆩⚔️𓆪 𝐎𝐟𝐟𝐢𝐜𝐢𝐚𝐥'
global.namecomu = '⏤͟͞ू⃪ g᥆kᥙ-ᑲᥣᥲᥴk-ᑲ᥆𝗍-mძ ✦⃝⛩️ 𝑪𝒐𝒎𝒎𝒖𝒏𝒊𝒕𝒚'
global.listo = '⚔️ *Aquí tienes, guerrero*'

global.canalIdM = [
  "120363276986902836@newsletter",
  "120363276986902836@newsletter"
]
global.canalNombreM = [
  "g᥆kᥙ-ᑲᥣᥲᥴk-ᑲ᥆𝗍-mძ - ᥙ⍴ძᥲ𝗍ᥱs 💫",
  "g᥆kᥙ-ᑲᥣᥲᥴk-ᑲ᥆𝗍-mძ • ᥆𝖿іᥴіᥲᥣ"
]
global.channelRD = await getRandomChannel()

global.d = new Date(Date.now() + 3600000)
global.locale = 'es'
global.dia = d.toLocaleDateString(locale, { weekday: 'long' })
global.fecha = d.toLocaleDateString('es', { day: 'numeric', month: 'numeric', year: 'numeric' })
global.mes = d.toLocaleDateString('es', { month: 'long' })
global.año = d.toLocaleDateString('es', { year: 'numeric' })
global.tiempo = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })

global.rwait = '🕒'
global.done = '✅'
global.error = '✖️'
global.msm = '⚠︎'

global.emoji = '💥'
global.emoji2 = '🔥'
global.emoji3 = '⚔️'
global.emoji4 = '💣'
global.emoji5 = '🎯'
global.emojis = [emoji, emoji2, emoji3, emoji4].getRandom()

global.wait = '⏳ 𝑷𝒓𝒐𝒄𝒆𝒔𝒂𝒏𝒅𝒐... Espera un momento.'

var canal = ''
let canal2 = ''
var git = ''
var github = ''
let correo = ''
global.redes = [canal, canal2, git, github, correo].getRandom()

let category = "imagen"
const db = './src/database/db.json'
const db_ = JSON.parse(fs.readFileSync(db))
const random = Math.floor(Math.random() * db_.links[category].length)
const randomlink = db_.links[category][random]
const response = await fetch(randomlink)
const rimg = await response.buffer()
global.icons = rimg

var ase = new Date(); var hour = ase.getHours();
switch (hour) {
  case 0: case 1: case 2: hour = 'Bᴜᴇɴᴀ Nᴏᴄʜᴇ 🌃'; break;
  case 3: case 4: case 5: case 6: case 8: case 9: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌄'; break;
  case 7: hour = 'Bᴜᴇɴᴀ Mᴀñᴀɴᴀ 🌅'; break;
  case 10: case 11: case 12: case 13: hour = 'Bᴜᴇɴᴏ Dɪᴀ 🌤'; break;
  case 14: case 15: case 16: case 17: hour = 'Bᴜᴇɴᴀ Tᴀʀᴅᴇ 🌆'; break;
  default: hour = 'Bᴜᴇɴᴀ Nᴏᴄʜᴇ 🌃'
}
global.saludo = hour

global.nombre = typeof nombre !== 'undefined' ? nombre : 'Anónimo'
global.botname = typeof botname !== 'undefined' ? botname : 'Bot'
global.dev = typeof dev !== 'undefined' ? dev : 'Developer'
global.taguser = typeof m !== 'undefined' && m.sender ? '@' + m.sender.split("@")[0] : '@anon'
var more = String.fromCharCode(8206)
global.readMore = more.repeat(850)

global.packsticker = `°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°\nᰔᩚ Usuario: ${nombre}\n❀ Bot: ${botname}\n✦ Fecha: ${fecha}\nⴵ Hora: ${tiempo}`

global.rcanal = {
  contextInfo: {
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: global.channelRD.id,
      serverMessageId: 100,
      newsletterName: global.channelRD.name,
    },
    externalAdReply: {
      showAdAttribution: true,
      title: global.botname,
      body: global.dev,
      mediaUrl: null,
      description: null,
      previewType: "PHOTO",
      thumbnail: global.icono,
      sourceUrl: global.redes,
      mediaType: 1,
      renderLargerThumbnail: false
    },
  }
}

async function getRandomChannel() {
  let randomIndex = Math.floor(Math.random() * global.canalIdM.length)
  let id = global.canalIdM[randomIndex]
  let name = global.canalNombreM[randomIndex]
  return { id, name }
}