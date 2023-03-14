import express from "express"
import cors from "cors"

import dotenv from "dotenv"

import axios from "axios"

const app = express()
dotenv.config()

const config = {
    port: process.env.PORT || 3000,
    statensVegvesenAuthorization: process.env.STATENS_VEGVESEN_AUTHORIZATION
}

if (!config.statensVegvesenAuthorization) {
    throw new Error("Missing environment variable STATENS_VEGVESEN_AUTHORIZATION")
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "*"
}))

app.use(express.static("public"))

async function requestVegvesene(path: string) {
    const url = `https://www.vegvesen.no${path}`

    const response = await axios.get(url, { headers: {
        "SVV-Authorization": `Apikey ${config.statensVegvesenAuthorization}`
    }})

    return response.data
}

app.post("/api/regnr", async (req, res) => {
    const { regnr } = req.body

    const data = await requestVegvesene(`/ws/no/vegvesen/kjoretoy/felles/datautlevering/enkeltoppslag/kjoretoydata?kjennemerke=${regnr}`)
    
    res.json(data)
})

app.listen(config.port, () => {
    console.log(`Server started on port ${config.port}`)
})