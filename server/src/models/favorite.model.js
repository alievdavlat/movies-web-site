import mongoose from "mongoose";
import modelOptions from "./models.options.js";


const favoriteSchema =  new mongoose.Schema({
  user:{
    type:String,
    ref:'User',
    required:true
  },
  content:{
    type:String,
    required:true
  },
  mediaType: {
    type:String,
    enum:['tv', 'movie'],
    required:true
  },
  medaId:{
    type:String,
    required:true
  },
  mediaTitle:{
    type:String,
    required:true
  },
  mediaPoster:{
    type:String,
    required:true
  },
  mediaRate:{
    type:Number,
    required:true
  },  
  
}, modelOptions)

const favoriteModel = mongoose.model('Favorite', favoriteSchema)

export default favoriteModel