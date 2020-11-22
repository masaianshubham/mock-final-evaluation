const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require("cors")

dotenv.config()

const app = express()
const routers = require("./Routes/Routes");
app.use(express.json())

app.use(cors())

mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, async () => {
    // await Product.insertMany(products)
    //     .then(res => console.log("Data Added"))
    //     .catch(err => console.log(err))
    console.log("Database is connected")
})

app.use("/", routers)

app.listen(5000, ()=> {
    console.log("server is up and running")
})