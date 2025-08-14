import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, args }) => {
    try {
        if (!args[0]) {
            return m.reply(`🌿 Ejemplo de uso: ${usedPrefix + command} https://www.facebook.com/share/r/1EaRMLuT1p/`);
        }

        if (!args[0].match(/(?:https?:\/\/(www\.|web\.|m\.)?(facebook|fb)\.(com|watch)\/\S+)?$/)) {
            return m.reply("✰ Enlace inválido. Asegúrate de que sea un enlace de Facebook válido.");
        }

        m.react('🕒');

        let fb = await getFacebookHD(args[0]);

        if (!fb || !fb.url) {
            return m.reply("✰ No se pudo obtener el video. Asegúrate de que el enlace sea público y correcto.");
        }

        let fileSize = await getFileSize(fb.url);
        let formattedSize = fileSize ? formatBytes(fileSize) : 'Desconocido';

        await conn.sendFile(
            m.chat,
            fb.url,
            'video.mp4',
            `❍ *Título:* ${fb.title || 'Desconocido'}\n❍ *Calidad:* ${fb.quality}\n❍ *Tamaño:* ${formattedSize}`,
            m,
            false,
            { thumbnail: fb.thumbnail ? await (await fetch(fb.thumbnail)).buffer() : null }
        );
    } catch (e) {
        console.error("✰ Error al procesar:", e);
        return conn.reply(m.chat, `🛑 Error al descargar el video:\n${e.message}`, m);
    }
};

handler.help = ["facebook"];
handler.command = ["fb", "facebook"];
handler.tags = ["download"];
export default handler;

async function getFacebookHD(url) {
    try {
        const api = `https://gokublack.xyz/download/facebook?url=${encodeURIComponent(url)}`;
        const res = await fetch(api);
        const json = await res.json();

        if (!json.result || !json.result.media) {
            throw new Error("Respuesta inválida de la API.");
        }

        return {
            url: json.result.media,
            title: json.result['título'],
            thumbnail: json.result.miniatura,
            quality: '720p'
        };
    } catch (err) {
        throw new Error("Fallo al contactar la api");
    }
}

async function getFileSize(url) {
    try {
        const res = await fetch(url, { method: 'HEAD' });
        const length = res.headers.get("content-length");
        return length ? parseInt(length) : null;
    } catch {
        return null;
    }
}

function formatBytes(bytes) {
    if (bytes === 0) return "0 B";
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
}