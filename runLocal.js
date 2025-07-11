import { BiBotModel } from './models/local/biBOT.js'
import { createAPP } from './app.js'

const models = {
    BiBotModel: BiBotModel,
}

createAPP({ models: models , string:'API-TRADINGVIEW FUNCIONANDO - DATOS EN JSON' })