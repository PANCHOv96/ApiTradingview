import { Router } from "express";
export const ControlarApi = Router()

var bloquear = false; // Cambia esto a true para bloquear

export function controlarApi(req, res, next) {
    if (bloquear) {
        return res.status(403).json({ error: 'Acceso bloqueado por configuración' });
    }
    next()
}

// ✅ Bloquear API
ControlarApi.get('/bloquear', (req,res)=>{
    bloquear = true
    res.status(200).json({result: "API BLOQUEADA"})
})

// ✅ DESBLOQUEAR API
ControlarApi.get('/desbloquear', (req,res)=>{
    bloquear = false
    res.status(200).json({result: "API DESBLOQUEADA"})
})