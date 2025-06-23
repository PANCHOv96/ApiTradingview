import express, { json } from 'express'
import cors from 'cors'
import { mainRoutes } from './routes/main.js';
import { BiBOT } from './routes/biBOT.js';
import { ControlarApi, controlarApi } from './routes/controlarApi.js';
import { Redireccionamiento } from './routes/redireccionamiento.js';
import { errorRoutes } from './routes/error.js';

export function createAPP({string}){
    const server = express();
    server.use(json()) 
    server.use(cors())

    server.use('/api', ControlarApi);
    server.use(controlarApi)

    server.get('/',(req,res)=>{
        res.status(200).json({
            status: 'EN LINEA'
        })
    })

    server.use(Redireccionamiento)
    server.use('/bibot',BiBOT)
    server.get('/*',errorRoutes)

    const PORT = process.env.PORT ?? 1235
    server.listen(PORT,()=>{
        console.log(string)
    })
}

createAPP({string:'API-TRADINGVIEW FUNCIONANDO'})
