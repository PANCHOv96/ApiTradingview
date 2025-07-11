import axios from 'axios'

export async function sendSignal(model,{ nameContract, coinTrade, stopPrice, priceLimit, side }){
    try{
        const { symbol, leverage } = await this.model.getData({nameContract, coinTrade });
        axios.get(`http://localhost:1236/signal?nameContract=${nameContract}&symbol=${symbol}&stopPrice=${stopPrice}&priceLimit=${priceLimit}&side=${side}&leverage=${leverage}`)
    }
    catch(error){
        console.log('REVENTO TELEGRAM API -- SIGNAL')
    }
}

export async function sendError({ endpoint, errorLocation, errorMessage }){
    try{
        await axios.get(`http://localhost:1236/error?endpoint=${endpoint}&errorLocation=${errorLocation}&errorMessage=${errorMessage}`,{
            timeout: 5000 // 5 segundos
        })
    }
    catch(error){
        console.log('REVENTO TELEGRAM API -- ERROR')
    }
}