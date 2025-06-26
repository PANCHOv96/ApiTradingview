
export function Redireccionamiento(req, res, next) {
    var { nameContract, nameBot, operation, coinTrade, stopPrice, priceLimit, partialClosure, TLSP, TLSP0, TLSP1 } = req.body
    const toLowerNameContract = String(nameContract).toString().toLowerCase()
    const toLowerNameBot = String(nameBot).toString().toLowerCase()
    const toUpperNameContract = String(nameContract).toString().toUpperCase()
    if((toLowerNameContract == 'coinm' || toLowerNameContract == 'usdm') && operation)
    {
        switch (operation){
            case 'CLOSE':
                res.redirect(`${toLowerNameBot}/cerrar-operacion?nameContract=${toUpperNameContract}&coinTrade=${coinTrade}&stopPrice=${stopPrice}`,302);
                break;
            case 'TRAILINGSTOP':
                res.redirect(`${toLowerNameBot}/trailingstop-trade?nameContract=${toUpperNameContract}&coinTrade=${coinTrade}&stopPrice=${stopPrice}`,302);
                break;
            case 'SELL':
                res.redirect(`${toLowerNameBot}/iniciar-operacion/SELL?nameContract=${toUpperNameContract}&coinTrade=${coinTrade}&stopPrice=${stopPrice}&priceLimit=${priceLimit}&partialClosure=${partialClosure}`,302);
                break;
            case 'BUY':
                res.redirect(`${toLowerNameBot}/iniciar-operacion/BUY?nameContract=${toUpperNameContract}&coinTrade=${coinTrade}&stopPrice=${stopPrice}&priceLimit=${priceLimit}&partialClosure=${partialClosure}`,302);
                break;
            default:
                res.redirect(`${toLowerNameBot}/prueba?nameContract=${toUpperNameContract}&operation=${operation}&coinTrade=${coinTrade}&stopPrice=${stopPrice}&priceLimit=${priceLimit}&partialClosure=${partialClosure}`,302);
        }
    }
    else
    {
        if(toLowerNameContract == 'test'){
            res.redirect(`${toLowerNameBot}/prueba?nameContract=${toUpperNameContract}&operation=${operation}&coinTrade=${coinTrade}&stopPrice=${stopPrice}&priceLimit=${priceLimit}&partialClosure=${partialClosure}`,302);
        }
        next()
    }
}