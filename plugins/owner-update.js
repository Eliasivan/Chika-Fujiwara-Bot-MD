import { exec } from 'child_process';

let handler = async (m, { conn }) => {
  m.reply(`Actualizando el Bot...`);

  const comando = 'find src -type f | xargs git update-index --assume-unchanged && git pull';

  exec(comando, (err, stdout, stderr) => {
    if (err) {
      conn.reply(m.chat, `🛑 Error: No se pudo realizar la actualización.\nRazón: ${err.message}`, m);
      return;
    }

    if (stderr) {
      console.warn('Advertencia durante la actualización:', stderr);
    }

    if (stdout.includes('Already up to date.')) {
      conn.reply(m.chat, `🍓 El bot ya está actualizado.`, m);
    } else {
      conn.reply(m.chat, `⚔ Actualización realizada con éxito.\n\n${stdout}`, m);
    }
  });
};

handler.help = ['update'];
handler.tags = ['owner'];
handler.command = ['update'];
handler.rowner = true;

export default handler;