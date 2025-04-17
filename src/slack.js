import axios from 'axios';
import { SLACK_WEBHOOK_URL } from './env.js';

export async function enviarMensajeASlack(texto) {
    try {
        await axios.post(SLACK_WEBHOOK_URL, {
            text: texto,
        });
        console.log('✅ Mensaje enviado a Slack.');
    } catch (error) {
        console.error('❌ Error al enviar a Slack:', error);
    }
}