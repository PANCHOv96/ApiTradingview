import { Router } from "express";
import { 
    ObtenerCantidadContratos, 
    TradeNuevo, 
    PosicionesAbiertas, 
    EliminarReducirPosicion,
    CerrarOrdenes,
    Trailingstop,
    reduceContract
} from "../utils/functions.js";

export const BiBOT = Router()

// ✅ Rutas Disponibles
BiBOT.get('/',async (req,res)=>{
    res.status(200).json(
        {
            'RUTAS DISPONIBLES':{
                "OPERACION BUY": "/iniciar-operacion/BUY", 
                "OPERACION SELL": "/iniciar-operacion/SELL", 
                "ELIMINAR / REDUCIR POSICION": "/cerrar-operacion", 
                "TRAILING STOP": "/trailingstop-trade", 
                "PRUEBA": "/prueba", 
            }
        }
    )
})

// ✅ INICIAR OPERACION BUY 
BiBOT.get('/iniciar-operacion/BUY',async (req,res)=>{
    try{
        const { nameContract, coinTrade, stopPrice, priceLimit, partialClosure} = req.query
        if(coinTrade && stopPrice && priceLimit && partialClosure){
            const quantity = await ObtenerCantidadContratos({nameContract,coinTrade:coinTrade.toUpperCase()});
            await TradeNuevo({nameContract,coinTrade,side:'BUY',quantity})
            const reducir = reduceContract({ nameContract, quantity, partialClosure});
            await Trailingstop({nameContract,coinTrade,side:'SELL',quantity:Math.abs(quantity),stopPrice:parseFloat(stopPrice)})
            await EliminarReducirPosicion({nameContract,coinTrade,side:'SELL',quantity:reducir,priceLimit:parseFloat(priceLimit)})
            res.status(200).json({result:"OK"})
        }
    }
    catch(error){
        console.log(`/iniciar-operacion/BUY ERROR: ${error}`)
        res.status(404).json({result:"Operacion BUY Rechazada"})
    }
})

// ✅ INICIAR OPERACION SELL
BiBOT.get('/iniciar-operacion/SELL',async (req,res)=>{
    try{
        const { nameContract, coinTrade, stopPrice, priceLimit, partialClosure } = req.query
        if(coinTrade && stopPrice && priceLimit && partialClosure){
            const quantity = await ObtenerCantidadContratos({nameContract,coinTrade:coinTrade.toUpperCase()});
            await TradeNuevo({nameContract,coinTrade,side:'SELL',stopPrice,quantity})
            const reducir = reduceContract({ nameContract, quantity, partialClosure});
            await Trailingstop({nameContract,coinTrade,side:'BUY',quantity:Math.abs(quantity),stopPrice:parseFloat(stopPrice)})
            await EliminarReducirPosicion({nameContract,coinTrade,side:'BUY',quantity:reducir,priceLimit:parseFloat(priceLimit)})
            res.status(200).json({result:"OK"})
        }
    }
    catch(error){
        console.log(`/iniciar-operacion/SELL ERROR: ${error}`)
        res.status(404).json({result:"Operacion SELL Rechazada"})
    }
})

// ✅ CERRAR OPERACION POR CRUCE
BiBOT.get('/cerrar-operacion',async (req,res)=>{
    try{
        const { nameContract, coinTrade } = req.query
        if(coinTrade){
            const quantity = await PosicionesAbiertas({nameContract,coinTrade:coinTrade.toUpperCase()});
            const side = quantity > 0 ? "SELL" : 'BUY';
            if(quantity != 0){
                await EliminarReducirPosicion({nameContract,coinTrade,side,quantity:Math.abs(quantity)})
            }
            await CerrarOrdenes({coinTrade})
            res.status(200).json({result:"OK"})
        }
    }
    catch(error){
        console.log(`/cerrar-operacion ERROR: ${error}`)
        res.status(404).json({result:"Erro al cerrar la operacion Abierta"})
    }
})

// ✅ TRAILING STOP OPERACION EN GANANCIA
BiBOT.get('/trailingstop-trade',async (req,res)=>{
    try{
        const { nameContract, coinTrade, stopPrice} = req.query
        if(coinTrade && stopPrice){
            const quantity = await PosicionesAbiertas({nameContract,coinTrade:coinTrade.toUpperCase()});
            const side = quantity > 0 ? "SELL" : 'BUY';
            if (quantity != 0){
                await CerrarOrdenes({nameContract,coinTrade})
                await Trailingstop({nameContract,coinTrade,side,quantity:Math.abs(quantity),stopPrice:parseFloat(stopPrice)})
            }
            res.status(200).json({result:"OK"})
        }
    }
    catch(error){
        console.log(`/trailingstop-trade ERROR: ${error}`)
        res.status(404).json({result:"Erro al crear el trailingstop"})
    }
})

BiBOT.get('/prueba',async(req,res)=>{
    console.log('PRUEBA DE COMO LLEGA LA INFORMACION')
    const { nameContract, coinTrade, operation, stopPrice, priceLimit, partialClosure} = req.query
    console.log('nameContract: ',nameContract)
    console.log('coinTrade: ',coinTrade)
    console.log('operation: ',operation)
    console.log('stopPrice: ',stopPrice)
    console.log('priceLimit: ',priceLimit)
    console.log('partialClosure: ',partialClosure)
    res.status(200).json({result:'OK'})
})