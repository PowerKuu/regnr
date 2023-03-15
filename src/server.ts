import express from "express"

import dotenv from "dotenv"
import { resolve } from "path"

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
app.use(express.static(resolve(__dirname, "public")))

async function requestVegvesene(path: string) {
    const url = `https://www.vegvesen.no${path}`

    const response = await axios.get(url, { headers: {
        "SVV-Authorization": `Apikey ${config.statensVegvesenAuthorization}`
    }})

    return response.data
}

app.post("/api/basic", async (req, res) => {
    const { regnr } = req.body
    const data = await requestVegvesene(`/ws/no/vegvesen/kjoretoy/felles/datautlevering/enkeltoppslag/kjoretoydata?kjennemerke=${regnr}`)
    
    res.json(data)
})

app.post("/api/advanced", async (req, res) => {
    res.json({})
})

app.post("/api/vipps", async (req, res) => {
    res.json({})
})

app.listen(config.port, () => {
    console.log(`Server started on port ${config.port}`)
})