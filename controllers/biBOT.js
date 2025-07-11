import { 
    ObtenerCantidadContratos, 
    TradeNuevo, 
    PosicionesAbiertas, 
    EliminarReducirPosicion,
    CerrarOrdenes,
    Trailingstop,
    reduceContract,
} from "../utils/functions.js";
import {
    sendSignal,
    sendError
} from "../utils/functionsTelegram.js";

export class BiBotController{

    constructor({ BiBotModel }){
        this.model = BiBotModel
    }

    rutes = async (req,res) => {
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
    }

    startOperationBUY = async (req,res) => {
        try{
            const { nameContract, coinTrade, stopPrice, priceLimit, partialClosure } = req.query
            if(coinTrade && stopPrice && priceLimit && partialClosure){
                const quantity = await ObtenerCantidadContratos(this.model,{nameContract,coinTrade});
                await TradeNuevo(this.model,{nameContract,coinTrade,side:'BUY',quantity})
                const reducir = reduceContract({ nameContract, quantity, partialClosure});
                Trailingstop(this.model,{nameContract,coinTrade,side:'SELL',quantity:Math.abs(quantity),stopPrice:parseFloat(stopPrice)})
                EliminarReducirPosicion(this.model,{nameContract,coinTrade,side:'SELL',quantity:reducir,priceLimit:parseFloat(priceLimit)})
                sendSignal(this.model,{ nameContract, coinTrade, stopPrice, priceLimit, side:"BUY" });
                res.status(200).json({result:"OK"})
            }
        }
        catch(error){
            const errorMsg = JSON.parse(error.message)
            sendError({
                endpoint:"/iniciar-operacion/BUY",
                errorLocation: 'ApiTradingView',
                errorMessage: errorMsg?.msg || ''
            });
            console.log(`/iniciar-operacion/BUY ERROR: ${errorMsg.msg}`)
            res.status(404).json({result:"Operacion BUY Rechazada"})
        }
    }

    startOperationSELL = async (req,res) => {
        try{
            const { nameContract, coinTrade, stopPrice, priceLimit, partialClosure } = req.query
            if(coinTrade && stopPrice && priceLimit && partialClosure){
                const quantity = await ObtenerCantidadContratos(this.model,{nameContract,coinTrade});
                await TradeNuevo(this.model,{nameContract,coinTrade,side:'SELL',stopPrice,quantity})
                const reducir = reduceContract({ nameContract, quantity, partialClosure});
                Trailingstop(this.model,{nameContract,coinTrade,side:'BUY',quantity:Math.abs(quantity),stopPrice:parseFloat(stopPrice)})
                EliminarReducirPosicion(this.model,{nameContract,coinTrade,side:'BUY',quantity:reducir,priceLimit:parseFloat(priceLimit)})
                sendSignal(this.model,{ nameContract, coinTrade, stopPrice, priceLimit, side:"SELL" });
                res.status(200).json({result:"OK"})
            }
        }
        catch(error){
            const errorMsg = JSON.parse(error.message)
            sendError({
                endpoint:"/iniciar-operacion/SELL",
                errorLocation: 'ApiTradingView',
                errorMessage: errorMsg?.msg || ''
            });
            console.log(`/iniciar-operacion/SELL ERROR: ${errorMsg.msg}`)
            res.status(404).json({result:"Operacion SELL Rechazada"})
        }
    }

    closeOperation = async (req,res) => {
        try{
            const { nameContract, coinTrade } = req.query
            if(coinTrade){
                const quantity = await PosicionesAbiertas(this.model,{nameContract,coinTrade});
                const side = quantity > 0 ? "SELL" : 'BUY';
                if(quantity != 0){
                    await EliminarReducirPosicion(this.model,{nameContract,coinTrade,side,quantity:Math.abs(quantity)});
                }
                await CerrarOrdenes(this.model,{nameContract,coinTrade})
                res.status(200).json({result:"OK"})
            }
        }
        catch(error){
            const errorMsg = JSON.parse(error.message)
            sendError({
                endpoint:"/cerrar-operacion",
                errorLocation: 'ApiTradingView',
                errorMessage: errorMsg?.msg || ''
            });
            console.log(`/cerrar-operacion ERROR: ${errorMsg.msg}`)
            res.status(404).json({result:"Erro al cerrar la operacion Abierta"})
        }
    }

    trailingstopTrade = async (req,res) => {
        try{
            const { nameContract, coinTrade, stopPrice} = req.query
            if(coinTrade && stopPrice){
                const quantity = await PosicionesAbiertas(this.model,{nameContract,coinTrade});
                const side = quantity > 0 ? "SELL" : 'BUY';
                if (quantity != 0){
                    await CerrarOrdenes(this.model,{nameContract,coinTrade})
                    await Trailingstop(this.model,{nameContract,coinTrade,side,quantity:Math.abs(quantity),stopPrice:parseFloat(stopPrice)})
                }
                res.status(200).json({result:"OK"})
            }
        }
        catch(error){
            const errorMsg = JSON.parse(error.message)
            sendError({
                endpoint:"/trailingstop-trade",
                errorLocation: 'ApiTradingView',
                errorMessage: errorMsg?.msg || ''
            });
            console.log(`/trailingstop-trade ERROR: ${errorMsg.msg}`)
            res.status(404).json({result:"Erro al crear el trailingstop"})
        }
    }

    testData = async (req,res) => {
        try{
            console.log('PRUEBA DE COMO LLEGA LA INFORMACION')
            const { nameContract, coinTrade, operation, stopPrice, priceLimit, partialClosure } = req.query
            const data = { nameContract, coinTrade, operation, stopPrice, priceLimit, partialClosure }
            console.log(data);
            res.status(200).json({result:'OK'})
        }
        catch(error){
            console.log(`/prueba ERROR: ${error}`)
            res.status(404).json({result:"Alguna Variables esta vacias"})
        }
    }
}