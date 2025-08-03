import { createHash } from 'crypto'

const REGEX_REGISTRO = /\|?\s*([^.]+)\s*\.\s*(\d+)\s*$/i

let handler = async function (m, { conn, text, usedPrefix, command }) {
    const user = global.db.data.users[m.sender]
    const nombreUsuario = conn.getName(m.sender)
    const imagen_url_registro = 'https://files.catbox.moe/ittzuq.webp'

    if (user.registered === true) {
        const mensajeYaRegistrado = `🌟 ¡Ya brillas en nuestra comunidad! 🌟\n\nNo es necesario que te registres de nuevo. Si quieres empezar de cero, puedes usar el comando:\n*${usedPrefix}unreg*`
        return m.reply(mensajeYaRegistrado)
    }

    if (!REGEX_REGISTRO.test(text)) {
        const mensajeErrorFormato = `💖 ¡Ups! Parece que el formato no es el correcto. 💖\n\nUsa el comando así:\n*${usedPrefix}reg ${nombreUsuario}.18*\n\n Sustituye "${nombreUsuario}" por tu nombre y "18" por tu edad.`
        return m.reply(mensajeErrorFormato)
    }

    let [_, nombre, edad] = text.match(REGEX_REGISTRO)
    
    if (!nombre) return m.reply('🎤 ¡Espera! Tu nombre es esencial para ser una estrella. No lo dejes en blanco.')
    if (nombre.length > 30) return m.reply('💖 Tu nombre es muy largo, ¡intenta con uno más corto y pegadizo!')
    
    edad = parseInt(edad)
    if (edad < 10) return m.reply('✨ ¡Aún eres una estrella en crecimiento! Debes tener al menos 10 años.')
    if (edad > 80) return m.reply('🌟 ¡La experiencia es valiosa! Pero la edad parece un poco alta, ¿estás seguro?')

    user.name = nombre.trim()
    user.age = edad
    user.regTime = Date.now()
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

    const mensajeExito = `
╭━┄━┄━┄━┄━┄━┄━┄━┄━┄━╮
┃      💎✨ ¡BIENVENID@ AL ESCENARIO! ✨💎
┣━┄━┄━┄━┄━┄━┄━┄━┄━┄━╯
┃
┃ 🎤 𝐍𝐨𝐦𝐛𝐫𝐞: ${nombre}
┃ 🎂 𝐄𝐝𝐚𝐝: ${edad} años
┃
┃ ¡Tu registro ha sido un éxito! 
┃ Ahora eres oficialmente parte del 
┃ club de fans. ¡Prepárate para brillar!
┃ 
┣━━━ • 💖 Recompensas Obtenidas 💖 • ━━━
┃
┃ 💵 Dinero: +${recompensa.money}
┃ 🌟 Estrellas: +${recompensa.estrellas}
┃ 📈 EXP: +${recompensa.exp}
┃ 🎟️ Tokens: +${recompensa.joincount}
┃
╰━┄━┄━┄━┄━┄━┄━┄━┄━┄━╮
     *Usa ${usedPrefix}menu para ver los reflectores*
╰━━━━━━━━━━━━━━━━━━━━╯
`

    await conn.sendMessage(m.chat, {
        text: mensajeExito,
        contextInfo: {
            externalAdReply: {
                title: '✨💖 ¡REGISTRO COMPLETADO! 💖✨',
                body: `¡Bienvenid@, ${nombre}!`,
                thumbnailUrl: imagen_url_registro,
                sourceUrl: 'https://github.com/Dioneibi-rip/Ruby-Hoshino-Bot',
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
};

handler.help = ['reg <nombre.edad>']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar']

export default handler