import express from "express"
import axios from "axios"


const app = express()

const config = {
    port: 3000,
    statensVegvesenAuthorization: "7d099692-1dc9-43c2-a195-dc1882e0751a"
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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