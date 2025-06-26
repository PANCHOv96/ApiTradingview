import { Router } from "express";

export const mainRoutes = Router()

mainRoutes.get('/',(req,res)=>{
    res.status(200).json({
        status: 'EN LINEA'
    })
})