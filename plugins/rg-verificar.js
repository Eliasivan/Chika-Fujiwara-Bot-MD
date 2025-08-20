import { createHash } from 'crypto'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { conn, text }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)

  if (user.registered === true) throw `*『✦』Ya estás registrado, para volver a registrarte, usa el comando: #unreg*`
  if (!Reg.test(text)) throw `*『✦』El comando ingresado es incorrecto, uselo de la siguiente manera:*\n\n#reg *Nombre.edad*\n\n\`\`\`Ejemplo:\`\`\`\n#reg *${name2}.18*`

  let [_, name, splitter, age] = text.match(Reg)

  if (!name) throw '*『✦』No puedes registrarte sin nombre, el nombre es obligatorio. Inténtelo de nuevo.*'
  if (!age) throw '*『✦』No puedes registrarte sin la edad, la edad es opcional. Inténtelo de nuevo.*'
  if (name.length >= 30) throw '*『✦』El nombre no debe tener más de 30 caracteres.*' 

  age = parseInt(age)

  if (age > 999) throw '*『😏』¡Viejo/a Sabroso/a!*'
  if (age < 5) throw '*¿𝐃𝐨𝐧𝐝𝐞 𝐞𝐬𝐭𝐚𝐧 𝐭𝐮𝐬 𝐩𝐚𝐩á𝐬?*😂'

  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true

  const recompensa = {
    money: 600,
    estrellas: 10,
    exp: 245,
    joincount: 5
  }

  user.money += recompensa.money
  user.estrellas += recompensa.estrellas
  user.exp += recompensa.exp
  user.joincount += recompensa.joincount

  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6)        
  m.react('📩') 

  let regbot = `╭══• ೋ•✧๑♡๑✧•ೋ •══╮
*¡REGISTRO COMPLETO EXITOSO!*
╰══• ೋ•✧๑♡๑✧•ೋ •══╯
║
┃ 🪪 Nombre: ${name}
┃ 🎂 Edad: ${age} *Años*
║
┃ 💵 Dinero: +${recompensa.money}
┃ 🌟 Estrellas: +${recompensa.estrellas}
┃ 📈 EXP: +${recompensa.exp}
┃ 🎟️ Tokens: +${recompensa.joincount}
║
║ 📝 Usa *.menu* para ver el menú de comandos.
╚═════════════════════`

  await conn.sendMessage(m.chat, {
    image: { url: 'https://telegra.ph/file/0bb7e9e7c8cb4e820f1fe.jpg' },
    caption: regbot
  }, { quoted: m })
}

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar'] 

export default handler