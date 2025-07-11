import axios from 'axios'
import { URLS } from './data_urls.js'

const url = URLS.urlApiBinance;

export async function ObtenerCantidadContratos(configBot,{nameContract,coinTrade}){
    try{
        const { symbol, leverage, priceContract, position } = await configBot.getData({nameContract,coinTrade});
        const precioActual = await axios.get(`${url.obtenerPrecio}?nameContract=${nameContract}&symbol=${symbol}`)
        .then(result => result.data.result.price);
        if(nameContract == 'COINM'){
            return Math.round((precioActual / priceContract)*leverage*position);
        }else
        {
            return ((position/precioActual)*leverage).toFixed(3);
        }
    }
    catch(e){
        var msg = e.response?.data?.error;
        if(!e.response.data.error){
            switch(e.TypeError){
                case undefined:
                    msg = 'Variables Indefinidas'
                    break;
                default:
                    msg = 'Error al crear nuevo trade'
            }
        }
        const error = { msg }
        throw new Error(JSON.stringify(error));
    }
}

export async function TradeNuevo(configBot,{nameContract,coinTrade,side,quantity}){
    try{
        const { symbol } = await configBot.getData({nameContract,coinTrade});
        const result = await axios.post(`${url.tradeNuevo}`,{
            nameContract,
            symbol: symbol, 
            type: "MARKET",
            side,
            quantity
        }).then(result => result.data.result);
        return result;
    }
    catch(e){
        var msg = e.response?.data?.error;
        if(!e.response.data.error){
            switch(e.TypeError){
                case undefined:
                    msg = 'Variables Indefinidas'
                    break;
                default:
                    msg = 'Error al crear nuevo trade'
            }
        }
        const error = { msg }
        throw new Error(JSON.stringify(error));
    }
}

export async function PosicionesAbiertas(configBot,{nameContract,coinTrade}){
    try{
        const { symbol } = await configBot.getData({nameContract,coinTrade});
        const result = await axios.get(`${url.posicionesAbiertas}?nameContract=${nameContract}&symbol=${symbol}`)
        .then(result => result.data.result);
        return result;
    }
    catch(e){
        var msg = e.response?.data?.error;
        if(!e.response.data.error){
            switch(e.TypeError){
                case undefined:
                    msg = 'Variables Indefinidas'
                    break;
                default:
                    msg = 'Error al crear nuevo trade'
            }
        }
        const error = { msg }
        throw new Error(JSON.stringify(error));
    }
}

export async function EliminarReducirPosicion(configBot,{nameContract,coinTrade,side,quantity,priceLimit=0}){
    try{
        const { symbol, decimal } = await configBot.getData({nameContract,coinTrade});
        const params ={
            nameContract,
            symbol, 
            type: (priceLimit == 0) ? "MARKET" : "LIMIT",     
            side,
            quantity,
        }
        if(priceLimit > 0){
            params.priceLimit= priceLimit.toFixed(decimal);
        }
        const result = await axios.post(`${url.eliminarReducirTrade}`,params).then(result => result.data.result);
        return result;
    }
    catch(e){
        var msg = e.response?.data?.error;
        if(!e.response.data.error){
            switch(e.TypeError){
                case undefined:
                    msg = 'Variables Indefinidas'
                    break;
                default:
                    msg = 'Error al crear nuevo trade'
            }
        }
        const error = { msg }
        throw new Error(JSON.stringify(error));
    }
}

export async function CerrarOrdenes(configBot,{nameContract,coinTrade}){
    try{
        const { symbol } = await configBot.getData({nameContract,coinTrade});
        const result = await axios.delete(`${url.cerrarOrdenes}`, { data: { nameContract, symbol }}).then(result => result.data.result);
        return result;
    }
    catch(e){
        var msg = e.response?.data?.error;
        if(!e.response.data.error){
            switch(e.TypeError){
                case undefined:
                    msg = 'Variables Indefinidas'
                    break;
                default:
                    msg = 'Error al crear nuevo trade'
            }
        }
        const error = { msg }
        throw new Error(JSON.stringify(error));
    }
}

export async function Trailingstop(configBot,{nameContract,coinTrade,side,quantity,stopPrice}){
    try{
        const { symbol, decimal } = await configBot.getData({nameContract,coinTrade});
        const result = await axios.post(`${url.trailingstop}`,{
            nameContract,
            symbol, 
            stopPrice:stopPrice.toFixed(decimal),
            side,
            quantity
        }).then(result => result.data.result);
        return result;
    }
    catch(e){
        var msg = e.response?.data?.error;
        if(!e.response.data.error){
            switch(e.TypeError){
                case undefined:
                    msg = 'Variables Indefinidas'
                    break;
                default:
                    msg = 'Error al crear nuevo trade'
            }
        }
        const error = { msg }
        throw new Error(JSON.stringify(error));
    }
}

export function reduceContract({nameContract, quantity, partialClosure}){
    try{
        var reduce = Math.abs(quantity);
        if(partialClosure != 0){
            switch(nameContract){
                case 'COINM':
                    reduce = Math.ceil((Math.abs(quantity)*partialClosure)/100);
                    break;
                default:
                    reduce = ((Math.abs(quantity)*partialClosure)/100).toFixed(3);
            }
        }
        return reduce
    }
    catch(e){
        var msg = e.response?.data?.error;
        if(!e.response.data.error){
            switch(e.TypeError){
                case undefined:
                    msg = 'Variables Indefinidas'
                    break;
                default:
                    msg = 'Error al crear nuevo trade'
            }
        }
        const error = { msg }
        throw new Error(JSON.stringify(error));
    }
}



