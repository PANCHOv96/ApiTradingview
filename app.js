import express, { json } from 'express'
import cors from 'cors'
import { mainRoutes } from './routes/main.js';
import { createBiBotRoutes } from './routes/biBOT.js';
import { ControlarApi, controlarApi } from './routes/controlarApi.js';
import { Redireccionamiento } from './routes/redireccionamiento.js';
import { errorRoutes } from './routes/error.js';

export function createAPP({models,string}){
    const server = express();
    server.use(json()) 
    server.use(cors())

    server.use('/api', ControlarApi);
    server.use(controlarApi)

    server.use('/',mainRoutes)
    server.use(Redireccionamiento)
    server.use('/bibot',createBiBotRoutes({ BiBotModel: models.BiBotModel }))
    server.get('/*',errorRoutes)

    const PORT = process.env.PORT ?? 1235
    server.listen(PORT,()=>{
        console.log(string)
    })
}
