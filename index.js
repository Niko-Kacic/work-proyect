const venom = require('venom-bot');
const axios = require('axios');
require('dotenv').config();


const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

venom.create({
    session: 'wsp-session',
    headless: false,
    browserArgs: ['--no-sandbox'],
}).then((client) => {
    console.log('🤖 Bot iniciado. Escanea el QR si es la primera vez.');

    client.onMessage((message) => {
        if (message.body) {
            console.log(`📩 Mensaje nuevo: ${message.body}`);

            axios.post(slackWebhookUrl, {
                text: `📲 *Nuevo mensaje de WhatsApp:*\n${message.body}`,
            }).then(() => {
                console.log('✅ Mensaje enviado a Slack.');
            }).catch((err) => {
                console.error('❌ Error al enviar a Slack:', err);
            });
        }
    });
}).catch((err) => {
    console.error('Error iniciando el bot:', err);
});
