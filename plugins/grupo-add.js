let handler = async (m, { conn, args, text, usedPrefix, command }) => {

  if (!text || !args[0]) throw `✐ Uso:\n${usedPrefix + command} 8291234567`
  
  let numero = args[0].replace(/[^0-9]/g, '') // Limpia cualquier símbolo
  if (numero.length < 8) throw '⚠️ Número no válido.'

  let id = numero + '@s.whatsapp.net'

  try {
    await conn.groupParticipantsUpdate(m.chat, [id], 'add')
    m.reply(`✅ Se intentó agregar a wa.me/${numero}`)
  } catch (e) {
    try {
      let code = await conn.groupInviteCode(m.chat)
      let groupName = (await conn.groupMetadata(m.chat)).subject
      let invite = `https://chat.whatsapp.com/${code}`

      // Enviar como contacto con link
      await conn.sendMessage(m.chat, {
        contacts: {
          displayName: `Invitación a ${groupName}`,
          contacts: [{
            displayName: numero,
            vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${numero}\nTEL;type=CELL;type=VOICE;waid=${numero}:${numero}\nEND:VCARD`
          }]
        }
      }, { quoted: m })

      await conn.sendMessage(id, {
        text: `✨ 𝙃𝙖𝙨 𝙧𝙚𝙘𝙞𝙗𝙞𝙙𝙤 𝙪𝙣𝙖 𝙞𝙣𝙫𝙞𝙩𝙖𝙘𝙞𝙤́𝙣 𝙙𝙚𝙡 𝙜𝙧𝙪𝙥𝙤 *${groupName}*\n\n📎 𝙐́𝙣𝙚𝙩𝙚 𝙖 𝙩𝙧𝙖𝙫𝙚́𝙨 𝙙𝙚𝙡 𝙨𝙞𝙜𝙪𝙞𝙚𝙣𝙩𝙚 𝙚𝙣𝙡𝙖𝙘𝙚:\n${invite}`,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          externalAdReply: {
            title: "📩 Invitación al grupo",
            body: groupName,
            thumbnailUrl: icons,
            mediaType: 1,
            renderLargerThumbnail: false,
            showAdAttribution: true,
            sourceUrl: invite
          }
        }
      })

      m.reply(`⚠️ *No se pudo añadir directamente.* Se le envió el contacto y el link al usuario.`)
    } catch (err) {
      m.reply('❌ Error al invitar o enviar contacto. Verifica que el número esté bien escrito.')
    }
  }
}

handler.command = /^(agregar|adduser|añadir)$/i
handler.help = ['agregar 8291234567']
handler.tags = ['group']
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler