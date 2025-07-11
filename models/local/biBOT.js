import { dataBIBOT } from '../../mocks/data_biBOT.js'

export class BiBotModel{
    static async getData({ nameContract, coinTrade }){
        const result = dataBIBOT[nameContract][coinTrade]
        if (result == undefined){
            throw new Error();
        }
        return result
    }
}
