import axios from 'axios'
import { DATA } from './data.js'

const url = DATA.urlApiBinance;

export async function ObtenerCantidadContratos({nameContract,coinTrade}){
    const { symbol, leverage, priceContract, position } = DATA.Trading.Future[nameContract][coinTrade];
    const precioActual = await axios.get(`${url.obtenerPrecio}?nameContract=${nameContract}&symbol=${symbol}`)
    .then(result => result.data.result.price);
    if(nameContract == 'COINM'){
        return Math.round((precioActual / priceContract)*leverage*position);
    }else
    {
        return ((position/precioActual)*leverage).toFixed(3);
    }
}

export async function TradeNuevo({nameContract,coinTrade,side,quantity}){
    const { symbol } = DATA.Trading.Future[nameContract][coinTrade];
    const result = await axios.post(`${url.tradeNuevo}`,{
        nameContract,
        symbol: symbol, 
        type: "MARKET",
        side,
        quantity
    }).then(result => result.data.result);
    return result;
}

export async function PosicionesAbiertas({nameContract,coinTrade}){
    const { symbol } = DATA.Trading.Future[nameContract][coinTrade];
    const result = await axios.get(`${url.posicionesAbiertas}?nameContract=${nameContract}&symbol=${symbol}`)
    .then(result => result.data.result);
    return result;
}

export async function EliminarReducirPosicion({nameContract,coinTrade,side,quantity,priceLimit=0}){
    const { symbol, decimal } = DATA.Trading.Future[nameContract][coinTrade];
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

export async function CerrarOrdenes({nameContract,coinTrade}){
    const { symbol } = DATA.Trading.Future[nameContract][coinTrade];
    const result = await axios.delete(`${url.cerrarOrdenes}`, { data: { nameContract, symbol }}).then(result => result.data.result);
    return result;
}

export async function Trailingstop({nameContract,coinTrade,side,quantity,stopPrice}){
    const { symbol, decimal } = DATA.Trading.Future[nameContract][coinTrade];
    const result = await axios.post(`${url.trailingstop}`,{
        nameContract,
        symbol, 
        stopPrice:stopPrice.toFixed(decimal),
        side,
        quantity
    }).then(result => result.data.result);
    return result;
}

export function reduceContract({nameContract, quantity, partialClosure}){
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

