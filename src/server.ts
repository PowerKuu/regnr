import express from "express"
import dotenv from "dotenv"

import { resolve } from "path"

import { regnrBasic, regnrAdvanced } from "./vegvesene"

dotenv.config()
const app = express()

const config = {
    port: process.env.PORT as string || "3000",
    vegvesenBasicAuthorization: process.env.VEGVESEN_BASIC_AUTHORIZATION as string,
    vegvesenAdvancedAuthorization: process.env.VEGVESEN_ADVANCED_AUTHORIZATION as string
}

if (!config.vegvesenBasicAuthorization || !config.vegvesenAdvancedAuthorization) {
    throw new Error("Missing authorization environment variable")
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(resolve(__dirname, "public")))

app.post("/api/basic", async (req, res) => {
    const { regnr } = req.body
    const data = await regnrBasic(config.vegvesenBasicAuthorization, regnr)
    
    res.json(data)
})

app.post("/api/advanced", async (req, res) => {
    const { regnr } = req.body

    const data = await regnrAdvanced(config.vegvesenAdvancedAuthorization, regnr)

    res.json(data)
})

app.post("/api/vipps", async (req, res) => {
    res.json({})
})

app.listen(config.port, () => {
    console.log(`Server started on port ${config.port}`)
})