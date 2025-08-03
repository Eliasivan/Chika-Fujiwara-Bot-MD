import JavaScriptObfuscator from 'javascript-obfuscator'

let handler = async (m, { conn, usedPrefix, command }) => {
  if (!m.quoted || !m.quoted.text) 
    return m.reply(`✳️ Responde a un mensaje que contenga el código JavaScript que deseas ofuscar.\n\nEjemplo:\n${usedPrefix + command} (responde a un mensaje con código)`)

  let code = m.quoted.text.trim()
  if (!code) return m.reply('✳️ El código a ofuscar no puede estar vacío.')

  // Ofuscación fuerte
  let obfuscated = JavaScriptObfuscator.obfuscate(code, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    numbersToExpressions: true,
    simplify: true,
    stringArray: true,
    stringArrayEncoding: ['base64'],
    stringArrayThreshold: 1,
    splitStrings: true,
    splitStringsChunkLength: 5,
    renameGlobals: true,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 1,
    unicodeEscapeSequence: true
  }).getObfuscatedCode()

  // Si el código es muy largo, puedes adaptarlo para enviarlo como archivo
  if (obfuscated.length > 4000) {
    return conn.sendMessage(m.chat, { document: Buffer.from(obfuscated), mimetype: 'text/javascript', fileName: 'codigo-ofuscado.js' }, { quoted: m })
  }

  m.reply('✅ Código fuertemente ofuscado:\n\n' + obfuscated)
}

handler.help = ['ofuscar']
handler.tags = ['tools']
handler.command = ['ofuscar', 'obfuscate']
handler.group = true

export default handler