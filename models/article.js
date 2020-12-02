const mongoose= require('mongoose');
const marked = require('marked');
const slugify=require('slugify');

const articleSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    markdown:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    slug:{
        type:String,
        required:true,
        unique:true
    }
})

// we are calculating slugs or we can intend to do anything before validation then we use pre on schema 
// we using slug so that we have slug of title in url rather than ugly id in url
articleSchema.pre('validate',function(next){
    if(this.title){
        this.slug=slugify(this.title,{lower :true,strict:true})
    }
    next()
})

module.exports= mongoose.model('Article',articleSchema);
