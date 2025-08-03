// --- VALORES NECESARIOS PARA LA NUEVA FUNCIONALIDAD ---
const newsletterJid = '120363335626706839@newsletter';
const newsletterName = '𖥔ᰔᩚ⋆｡˚ ꒰🍒 ʀᴜʙʏ-ʜᴏꜱʜɪɴᴏ | ᴄʜᴀɴɴᴇʟ-ʙᴏᴛ 💫꒱࣭';
const packname = '⏤͟͞ू⃪  ̸̷͢𝐑𝐮𝐛y͟ 𝐇𝐨𝐬𝐡𝐢n͟ᴏ 𝐁𝐨t͟˚₊·—̳͟͞͞♡̥';

// Array de miniaturas
const iconos = [
      'https://files.catbox.moe/c0mxk7.png',
      'https://files.catbox.moe/g27mli.png',
      'https://files.catbox.moe/wvz4n8.png',
      'https://files.catbox.moe/uscoxy.png',
      'https://files.catbox.moe/ahp3bc.jpeg',
      'https://files.catbox.moe/uc272d.webp',
      'https://files.catbox.moe/edsflw.jpg',
      'https://files.catbox.moe/ilkgfh.webp',
      'https://files.catbox.moe/k25pcl.jpg',
      'https://files.catbox.moe/nvhomc.jpeg',
      'https://files.catbox.moe/k25pcl.jpg',
      'https://files.catbox.moe/i7vsnr.jpg',
      'https://files.catbox.moe/y2pyj7.png',
      'https://files.catbox.moe/88fn6r.png',
      'https://files.catbox.moe/zem8ot.png',
      'https://files.catbox.moe/r4fme5.png',
      'https://files.catbox.moe/0buw2b.png',
      'https://files.catbox.moe/guwjzo.png',
      'https://files.catbox.moe/n4c1es.png',
      'https://files.catbox.moe/gmfmlc.png',
      'https://files.catbox.moe/lh9yee.jpeg',
      'https://files.catbox.moe/qq6bus.jpeg',
      'https://files.catbox.moe/dcewri.jpeg',
      'https://files.catbox.moe/4pijms.jpeg',
      'https://files.catbox.moe/r1zoca.jpeg',
      'https://files.catbox.moe/kxmofl.jpeg',
      'https://files.catbox.moe/8payfy.jpeg',
      'https://files.catbox.moe/ivuvyd.jpeg',
      'https://files.catbox.moe/jungci.jpg',
      'https://files.catbox.moe/5qglcn.jpg',
      'https://files.catbox.moe/0ug43e.jpg',
      'https://files.catbox.moe/d81jgr.jpg',
      'https://files.catbox.moe/fxh1yr.jpg',
      'https://files.catbox.moe/6x9q51.jpg',
      'https://files.catbox.moe/0cj084.jpg',
      'https://files.catbox.moe/e9zgbu.jpg',
      'https://files.catbox.moe/jvtpq7.jpeg',
      'https://files.catbox.moe/jvtpq7.jpeg',
      'https://files.catbox.moe/jm6j5b.jpeg',
      'https://files.catbox.moe/jgqjec.jpeg',
      'https://files.catbox.moe/iph9xr.jpeg',
      'https://files.catbox.moe/5wfvd8.jpeg',
      'https://files.catbox.moe/k8griq.jpeg',
      'https://files.catbox.moe/k8griq.jpeg',
      'https://files.catbox.moe/undk05.jpeg',
      'https://files.catbox.moe/104xtw.jpeg',
      'https://files.catbox.moe/kf9jgc.jpeg',
      'https://files.catbox.moe/pjuo2b.jpg',
      'https://files.catbox.moe/pjt7o7.jpg',
      'https://files.catbox.moe/7bn1pf.jpg',
      'https://files.catbox.moe/fsdo40.jpg',
      'https://files.catbox.moe/fe6pw6.jpeg',
      'https://files.catbox.moe/z79x8o.jpeg', 
];

// Función para obtener una aleatoria
const getRandomIcono = () => iconos[Math.floor(Math.random() * iconos.length)];

/**
 * Plugin centralizado para manejar todos los mensajes de error de permisos.
 */
const handler = (type, conn, m, comando) => {
  const msg = {
  rowner: '「🌺」 *Gomenasai~! Esta función solo la puede usar mi creador celestial...* 🌌\n\n> *Dioneibi-sama.*',
  owner: '「🌸」 *¡Nyaa~! Solo mi creador y programadores pueden usar este comando~!* 💾💕',
  mods: '「🌟」 *Uguu~ Esto eso solo lo pueden usar mis desarrolladores mágicos~!* 🔮',
  premium: '「🍡」 *Ehh~? Esta función es exclusiva para usuarios Premium-desu~!* ✨\n\n💫 *¿No eres premium aún? Consíguelo ahora usando:*\n> ✨ *.comprarpremium 2 dias*  (o reemplaza "2 dias" por la cantidad que desees).',
  group: '「🐾」 *¡Onii-chan~! Este comando solo puede usarse en grupos grupales~!* 👥',
  private: '「🎀」 *Shh~ Este comando es solo para ti y para mí, en privado~* 💌',
  admin: '「🧸」 *¡Kyah~! Solo los admin-senpai pueden usar esta habilidad~!* 🛡️',
  botAdmin: '「🔧」 *¡Espera! Necesito ser admin para que este comando funcione correctamente.*\n\n🔧 *Hazme admin y desataré todo mi poder~*',
  unreg: `🍥 𝑶𝒉 𝒏𝒐~! *¡Aún no estás registrado~!* 😿\nNecesito conocerte para que uses mis comandos~ ✨\n\n📝 Por favor regístrate con:\n» */reg nombre.edad*\n\n🎶 Ejemplo encantado:\n» */reg Dioneibi-kun.15*\n\n💖 ¡Así podré reconocerte, nya~!*`,
  restrict: '「📵」 *¡Ouh~! Esta función está dormida por ahora~* 💤'
  }[type];

  if (msg) {
    const contextInfo = {
      mentionedJid: [m.sender],
      isForwarded: true,
      forwardingScore: 999,
      forwardedNewsletterMessageInfo: {
        newsletterJid,
        newsletterName,
        serverMessageId: -1
      },
      externalAdReply: {
        title: packname,
        body: 'I🎀 𓈒꒰ 𝐘𝐚𝐲~ 𝐇𝐨𝐥𝐚𝐚𝐚! (≧∇≦)/',
        thumbnailUrl: getRandomIcono(), // ← aleatoria
        sourceUrl: redes,
        mediaType: 1,
        renderLargerThumbnail: false
      }
    };

    return conn.reply(m.chat, msg, m, { contextInfo }).then(_ => m.react('✖️'));
  }

  return true;
};

export default handler;