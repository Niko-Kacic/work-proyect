import venom from 'venom-bot';
import { enviarMensajeASlack } from './slack.js';

export function iniciarBot() {
    venom.create({
        session: 'wsp-session',
        headless: false,
        useChrome: true,
        browserArgs: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-gpu',
        ],
    })
        .then((client) => {
            console.log('🤖 Bot iniciado. Escanea el QR si es la primera vez.');
            client.onMessage((message) => {
                if (message.body && !message.isGroupMsg) {
                    console.log(`📩 Nuevo mensaje: ${message.body}`);
                    enviarMensajeASlack(`📲 *Nuevo mensaje de WhatsApp:*\n${message.body}`);
                }
            });
        })
        .catch((err) => {
            console.error('❌ Error iniciando el bot:', err);
        });
}
