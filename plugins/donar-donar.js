var handler = async (m, { conn, command }) => {
  let user = '@' + m.sender.split('@')[0]

  let str = `*Hola ${user}* (⁠◜⁠‿⁠◝⁠)⁠♡

Si estás disfrutando de nuestro Botsito y deseas apoyarnos, cualquier aporte pequeño que sea es muy bienvenido 💖

❤️‍🔥 *Puedes donar a través de PayPal:*  
copiakevin22@gmail.com

🫂 Gracias por tu apoyo, Eres increíble (⁠◕‿◕)⁠ノ

🔗 *Repositorio del bot:*  
github.com/Eliasivan/Goku-Black-Bot-MD

🧑🏻‍💻 *Creador:*  
https://wa.me/595972157130`

  conn.reply(m.chat, str, m, { mentions: [m.sender] })
}

handler.help = ['donar', 'donate', 'donasi']
handler.tags = ['info']
handler.command = /^donar|donate|donasi$/i

handler.register = true

export default handler