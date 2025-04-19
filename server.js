import express from 'express'
import mongoose from 'mongoose'
import { shortUrl, getoriginalurl } from './controllers/url.js'
import { config } from 'dotenv'


const app = express()

app.use(express.urlencoded({extended: true }))

config({ path: '.env'})


mongoose.connect(process.env.MONGO_URI , {dbName:"Nodejs_Mastery_Course"})
.then(()=>console.log("MongoDB COnnected Successfully"))
.catch((err)=>console.log(err))

// Rendering the EJS File
app.get('/',(req,res)=>{
    res.render("index.ejs",{shortUrl:null } )
})

// Shorturl logic from the controllers folder.
app.post('/short', shortUrl )

// Get Original Url :- Dynamic Form.
app.get('/:shortCode', getoriginalurl )

const port = process.env.PORT

app.listen(port,()=>console.log(`Server is started in ${port}`))