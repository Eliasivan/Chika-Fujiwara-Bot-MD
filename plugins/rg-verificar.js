import { createHash } from 'crypto'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { conn, text }) {
  let user = global.db.data.users[m.sender]
  if (!user) global.db.data.users[m.sender] = user = {
    registered: false, name: '', age: 0, regTime: 0,
    money: 0, estrellas: 0, exp: 0, joincount: 0
  }

  const name2 = (await conn.getName?.(m.sender)) || 'Usuario'

  if (user.registered === true) return conn.reply(m.chat, `*『✦』Ya estás registrado, para volver a registrarte, usa el comando: #unreg*`, m)
  if (!Reg.test(text)) return conn.reply(m.chat, `*『✦』El comando ingresado es incorrecto, úselo así:*\n\n#reg *Nombre.edad*\n\n\`\`\`Ejemplo:\`\`\`\n#reg *${name2}.18*`, m)

  let [_, name, splitter, age] = text.match(Reg)

  if (!name) return conn.reply(m.chat, '*『✦』No puedes registrarte sin nombre.*', m)
  if (!age) return conn.reply(m.chat, '*『✦』No puedes registrarte sin la edad.*', m)
  if (name.length >= 30) return conn.reply(m.chat, '*『✦』El nombre no debe tener más de 30 caracteres.*', m)

  age = parseInt(age)
  if (age > 999) return conn.reply(m.chat, '*『😏』¡Viejo/a Sabroso/a!*', m)
  if (age < 5) return conn.reply(m.chat, '*¿Dónde están tus papás?* 😂', m)

  user.name = name.trim()
  user.age = age
  user.regTime = +new Date()
  user.registered = true

  const recompensa = { money: 600, estrellas: 10, exp: 245, joincount: 5 }

  user.money = (user.money || 0) + recompensa.money
  user.estrellas = (user.estrellas || 0) + recompensa.estrellas
  user.exp = (user.exp || 0) + recompensa.exp
  user.joincount = (user.joincount || 0) + recompensa.joincount

  const sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6)
  m.react?.('📩')

  const regbot = `╭══• ೋ•✧๑♡๑✧•ೋ •══╮
*¡REGISTRO COMPLETO EXITOSO!*
╰══• ೋ•✧๑♡๑✧•ೋ •══╯

┃ 🪪 Nombre: ${name}
┃ 🎂 Edad: ${age} *Años*

┃ 💵 Dinero: +${recompensa.money}
┃ 🌟 Estrellas: +${recompensa.estrellas}
┃ 📈 EXP: +${recompensa.exp}
┃ 🎟️ Tokens: +${recompensa.joincount}

📝 Usa *.menu* para ver el menú de comandos.
`

  await conn.sendMessage(m.chat, {
    image: { url: 'https://telegra.ph/file/0bb7e9e7c8cb4e820f1fe.jpg' },
    caption: regbot
  }, { quoted: m })
}

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar']

export default handler