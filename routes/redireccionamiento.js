
export function Redireccionamiento(req, res, next) {
    if(req.method === 'POST' && req.body && Object.keys(req.body).length > 0){
        const { nameContract, nameBot, operation, coinTrade, stopPrice, priceLimit, partialClosure } = req.body
        const toLowerNameContract = String(nameContract).toString().toLowerCase()
        const toLowerNameBot = String(nameBot).toString().toLowerCase()
        const toUpperNameContract = String(nameContract).toString().toUpperCase()
        const coinTadeUpperCase = String(coinTrade).toUpperCase()
        if((toLowerNameContract == 'coinm' || toLowerNameContract == 'usdm') && operation)
        {
            switch (operation){
                case 'CLOSE':
                    res.redirect(`${toLowerNameBot}/cerrar-operacion?nameContract=${toUpperNameContract}&coinTrade=${coinTadeUpperCase}&stopPrice=${stopPrice}`,302);
                    break;
                case 'TRAILINGSTOP':
                    res.redirect(`${toLowerNameBot}/trailingstop-trade?nameContract=${toUpperNameContract}&coinTrade=${coinTadeUpperCase}&stopPrice=${stopPrice}`,302);
                    break;
                case 'SELL':
                    res.redirect(`${toLowerNameBot}/iniciar-operacion/SELL?nameContract=${toUpperNameContract}&coinTrade=${coinTadeUpperCase}&stopPrice=${stopPrice}&priceLimit=${priceLimit}&partialClosure=${partialClosure}`,302);
                    break;
                case 'BUY':
                    res.redirect(`${toLowerNameBot}/iniciar-operacion/BUY?nameContract=${toUpperNameContract}&coinTrade=${coinTadeUpperCase}&stopPrice=${stopPrice}&priceLimit=${priceLimit}&partialClosure=${partialClosure}`,302);
                    break;
                default:
                    res.redirect(`${toLowerNameBot}/prueba?nameContract=${toUpperNameContract}&operation=${operation}&coinTrade=${coinTadeUpperCase}&stopPrice=${stopPrice}&priceLimit=${priceLimit}&partialClosure=${partialClosure}`,302);
            }
            // switch(operation){
            //     case 'CLOSE':
            //         res.redirect(`${toLowerNameBot}/cerrar-operacion`,302);
            //         break;
            //     case 'TRAILINGSTOP':
            //         res.redirect(`${toLowerNameBot}/trailingstop-trade`,302);
            //         break;
            //     case 'SELL':
            //         res.redirect(`${toLowerNameBot}/iniciar-operacion/SELL`,302);
            //         break;
            //     case 'BUY':
            //         res.redirect(`${toLowerNameBot}/iniciar-operacion/BUY`,302);
            //         break;
            //     default:
            //         res.redirect(`${toLowerNameBot}/prueba`,302);
            // }
        }
        else
        {
            if(toLowerNameContract == 'test'){
                // res.redirect(`${toLowerNameBot}/prueba`,302);
                res.redirect(`${toLowerNameBot}/prueba?nameContract=${toUpperNameContract}&operation=${operation}&coinTrade=${coinTadeUpperCase}&stopPrice=${stopPrice}&priceLimit=${priceLimit}&partialClosure=${partialClosure}`,302);
            }else{
                next()
            }
        }
    }else{
        next()
    }
}