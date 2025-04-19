import mongoose from "mongoose";

const shorturl = new mongoose.Schema({
    shortCode:String,
    longUrl:String
})

export const Url = mongoose.model("url", shorturl )