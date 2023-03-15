import axios from "axios"
import { RequestData } from "./types"

export async function requestVegvesene(method:string, url: string, data: RequestData) {
    const response = await axios(url, { 
            method,

            headers: {
                "Content-Type": "application/json",
                ...data.headers
            },

            data: data.body || {},
            params: data.params || {},
        }
    )

    return response.data
}

export function regnrBasic(auth:string, regnr:string) {
    const url = "https://www.vegvesen.no/ws/no/vegvesen/kjoretoy/felles/datautlevering/enkeltoppslag/kjoretoydata"

    return requestVegvesene(
        "GET", url, {
        params: {
            kjennemerke: regnr
        },
        headers: {
            "SVV-Authorization": auth
        }
    })
}

export function regnrAdvanced(auth:string, regnr:string) {
    const url = "https://akfell-datautlevering-sisdinky.utv.atlas.vegvesen.no/kjoretoyoppslag/bulk/kjennemerke"

    return requestVegvesene(
        "GET", url, {
        body: [{
            kjennemerke: regnr
        }],
        headers: {
            "Authorization": auth
        }
    })
}