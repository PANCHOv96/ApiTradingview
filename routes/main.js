import { Router } from "express";

export const mainRoutes = Router()

mainRoutes.get('/',(req,res)=>{
    res.json(
        {
            'RUTAS DISPONIBLES':{
                "BUY": "/online",
            }
        }
    )
})