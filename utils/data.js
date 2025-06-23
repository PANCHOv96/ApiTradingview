const url_base = 'http://localhost:1234/online'

export const DATA = {
    urlApiBinance: {
        obtenerPrecio: `${url_base}/obtener-precio`,
        tradeNuevo: `${url_base}/iniciar-trade-nuevo`,
        posicionesAbiertas: `${url_base}/posiciones-abiertas`,
        eliminarReducirTrade: `${url_base}/eliminar-reducir-trade`,
        cerrarOrdenes: `${url_base}/cerrar-ordenes`,
        trailingstop: `${url_base}/trailingstop-trade`,
    },
    Trading:{
        Future:{
            USDM:{
                BTC:{
                    symbol: 'BTCUSDT',
                    leverage: 1,
                    priceContract: 100,
                    position: 120
                },
                ETH:{
                    symbol: 'ETHUSDT',
                    leverage: 5,
                    priceContract: 100,
                    position: 25
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
