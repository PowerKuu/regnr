import express from "express"
import axios from "axios"


const app = express()
// Or environment variable
const port = 3000
const config = {
    StatensVegvesenAuthorization: "7d099692-1dc9-43c2-a195-dc1882e0751a"
}
    
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post("/api/regnr", async (req, res) => {
    const { regnr } = req.body
    console.log(req.body)

    const url = `https://www.vegvesen.no/ws/no/vegvesen/kjoretoy/felles/datautlevering/enkeltoppslag/kjoretoydata?kjennemerke=${regnr}`
    const response = await axios.get(url, { headers: {
        "SVV-Authorization": `Apikey ${config.StatensVegvesenAuthorization}`
    }})

    const data = response.data

    console.log(data)
    
    
    res.json(data)
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})