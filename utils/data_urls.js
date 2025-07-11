import 'dotenv/config.js';

const { URL_BASE }  = process.env

export const URLS = {
    urlApiBinance: {
        obtenerPrecio: `${URL_BASE}/obtener-precio`,
        tradeNuevo: `${URL_BASE}/iniciar-trade-nuevo`,
        posicionesAbiertas: `${URL_BASE}/posiciones-abiertas`,
        eliminarReducirTrade: `${URL_BASE}/eliminar-reducir-trade`,
        cerrarOrdenes: `${URL_BASE}/cerrar-ordenes`,
        trailingstop: `${URL_BASE}/trailingstop-trade`,
    }
}
