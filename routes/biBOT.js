import { Router } from "express";
import { BiBotController } from "../controllers/biBOT.js";

export function createBiBotRoutes({ BiBotModel }){
    const biBotRoutes = Router()
    const biBotController = new BiBotController({ BiBotModel });

    // ✅ RUTAS DISPONIBLES
    biBotRoutes.get('/', biBotController.rutes)

    // ✅ INICIAR OPERACION BUY 
    biBotRoutes.get('/iniciar-operacion/BUY', biBotController.startOperationBUY)

    // ✅ INICIAR OPERACION SELL
    biBotRoutes.get('/iniciar-operacion/SELL',biBotController.startOperationSELL)

    // ✅ CERRAR OPERACION POR CRUCE
    biBotRoutes.get('/cerrar-operacion', biBotController.closeOperation)

    // ✅ TRAILING STOP OPERACION EN GANANCIA
    biBotRoutes.get('/trailingstop-trade',biBotController.trailingstopTrade)

    // ✅ PRUEBA DE DATOS
    biBotRoutes.get('/prueba',biBotController.testData)

    return biBotRoutes;
}

