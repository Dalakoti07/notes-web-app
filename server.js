const express= require('express');
const app=express();
const articleRouter= require('./routes/article')
const mongoose= require('mongoose') 
const Article= require('./models/article')

mongoose.connect('mongodb://localhost/notes',{ useNewUrlParser: true,useUnifiedTopology: true ,useCreateIndex:true})
        .then(()=>{},(error)=>console.log("Error in connecting with db "+error))

app.set('view engine','ejs');

app.use(express.urlencoded({extended:false}))

app.get('/',async (req,res)=>{
    const articles= await Article.find().sort({
        createdAt:'desc'
    });
    res.render('articles/index',{articles:articles});
})


app.use('/articles',articleRouter);

app.listen(5000);