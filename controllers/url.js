import { Url } from "../Models/Url.js"
import shortid from "shortid"


export const shortUrl = async (req,res) =>{
    const longUrl = req.body.longUrl
    const shortCode = shortid.generate()

    // this port is not working 
    // const shortUrl = `http://localhost:2000/${shortCode}`

    //this port is work i have done some manually change you can compare both.
    const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

    // Save to Database
    const newUrl = new Url({shortCode,longUrl})
    await newUrl.save()

    console.log("short saved = ",newUrl)

    res.render("index.ejs", {shortUrl} )
}



export const getoriginalurl = async (req,res) =>{
    const shortCode = req.params.shortCode
  
    // Find from the database.
    const originalurl = await Url.findOne({ shortCode })

    if(originalurl){
        res.redirect(originalurl.longUrl)
    }else{
        res.json({ message:"Invalid Shortcode" })
    }

}