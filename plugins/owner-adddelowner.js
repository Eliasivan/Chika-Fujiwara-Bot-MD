const protectedOwners = [
  '8294868853',
  '18096758983',
  '526671548329'
];

const newsletterJid  = '120363335626706839@newsletter';
const newsletterName = '⏤͟͞ू⃪፝͜⁞⟡『 Ruby-Hoshino-Channel 』࿐⟡';

const handler = async (m, { conn, text, args, usedPrefix, command }) => {
  try {
    console.log('Handler disparado:', command, text, args);

    // Cambiado: getName síncrono
    let name;
    try {
      name = conn.getName(m.sender);
    } catch (e) {
      name = m.sender;
    }

    const contextInfo = {
      mentionedJid: [m.sender],
      isForwarded: true,
      forwardingScore: 999,
      forwardedNewsletterMessageInfo: {
        newsletterJid,
        newsletterName,
        serverMessageId: -1
      }
    };

    const emojiAdd = '✨';
    const emojiDel = '❌';
    const noTarget = `${emojiAdd} Por favor menciona o responde al usuario que quieres ${command === 'addowner' ? 'añadir' : 'quitar'} como owner.`;

    // Determinar JID del target
    let who = m.mentionedJid?.[0]
      || m.quoted?.sender
      || (text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null);

    console.log('Target who:', who);

    if (!who) return conn.reply(m.chat, noTarget, m, { mentions: [m.sender], contextInfo });

    // QUITA SUFIJO (solo el número)
    const onlyNumber = who.replace(/[@:].*$/, '');

    console.log('Solo número:', onlyNumber);
    console.log('global.owner actual:', JSON.stringify(global.owner));

    if (command === 'addowner') {
      if (global.owner.find(o => o[0] === onlyNumber)) {
        return conn.reply(m.chat, `🌸 ${onlyNumber} ya es owner, ${name}-chan~`, m, { contextInfo });
      }

      // Cambiado: getName síncrono
      let contactName;
      try {
        contactName = conn.getName(who);
      } catch (e) {
        contactName = onlyNumber;
      }

      const entry = [ onlyNumber, contactName, true ];
      global.owner.splice(protectedOwners.length, 0, entry);
      console.log('global.owner tras añadir:', JSON.stringify(global.owner));
      await conn.reply(
        m.chat,
        `${emojiAdd} Se ha añadido a *${contactName}* como Owner.\n\n` +
        `📋 Ahora la lista de owners queda así:\n` +
        `\`\`\`${JSON.stringify(global.owner, null, 2)}\`\`\``,
        m,
        { mentions: [who], contextInfo }
      );
    }

    if (command === 'delowner') {
      if (protectedOwners.includes(onlyNumber)) {
        return conn.reply(
          m.chat,
          `🚫 No está permitido quitarle owner a esa persona, está protegida.`,
          m,
          { contextInfo }
        );
      }
      const idx = global.owner.findIndex(o => o[0] === onlyNumber);
      if (idx !== -1) {
        const removed = global.owner[idx][1];
        global.owner.splice(idx, 1);
        console.log('global.owner tras eliminar:', JSON.stringify(global.owner));
        await conn.reply(
          m.chat,
          `${emojiDel} Se ha eliminado a *${removed}* de la lista de Owners.`,
          m,
          { mentions: [who], contextInfo }
        );
      } else {
        await conn.reply(
          m.chat,
          `${emojiDel} Ese número no está en la lista de Owners.`,
          m,
          { contextInfo }
        );
      }
    }

  } catch (e) {
    console.error('Error en el handler:', e);
    return conn.reply(m.chat, 'Ocurrió un error inesperado: ' + e, m);
  }
};

handler.command = ['addowner', 'delowner'];
handler.rowner = true;
handler.help = ['addowner <@user>', 'delowner <@user>'];
handler.tags = ['owner'];

export default handler;