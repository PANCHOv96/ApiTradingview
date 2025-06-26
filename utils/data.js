import 'dotenv/config.js';

const { URL_BASE }  = process.env

export const DATA = {
    urlApiBinance: {
        obtenerPrecio: `${URL_BASE}/obtener-precio`,
        tradeNuevo: `${URL_BASE}/iniciar-trade-nuevo`,
        posicionesAbiertas: `${URL_BASE}/posiciones-abiertas`,
        eliminarReducirTrade: `${URL_BASE}/eliminar-reducir-trade`,
        cerrarOrdenes: `${URL_BASE}/cerrar-ordenes`,
        trailingstop: `${URL_BASE}/trailingstop-trade`,
    },
    Trading:{
        Future:{
            USDM:{
                BTC:{
                    symbol: 'BTCUSDT',
                    leverage: 1,
                    priceContract: 100,
                    position: 1200,
                    decimal: 1
                },
                ETH:{
                    symbol: 'ETHUSDT',
                    leverage: 5,
                    priceContract: 100,
                    position: 25,
                    decimal: 2
                }
            },
            COINM:{
                BTC:{
                    symbol: 'BTCUSD_PERP',
                    leverage: 1,
                    priceContract: 100,
                    position: 0.001
                },
                THETA:{
                    symbol: 'THETAUSD_PERP',
                    leverage: 3,
                    priceContract: 10,
                    position: 100,
                    decimal: 3
                },
                BNB:{
                    symbol: 'BNBUSD_PERP',
                    leverage: 15,
                    priceContract: 10,
                    position: 0.10,
                    decimal: 2
                }
            }
        }
    }
}
