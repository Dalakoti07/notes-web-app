const express= require('express');
const app=express();
const articleRouter= require('./routes/article')
const mongoose= require('mongoose') 

mongoose.connect('mongodb://localhost/notes',{ useNewUrlParser: true,useUnifiedTopology: true })
        .then(()=>{},(error)=>console.log("Error in connecting with db "+error))

app.set('view engine','ejs');

app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    const articles=[{
        title:'articles 1',
        createdAt:new Date(),
        decsription:'Description 1'
    },{
        title:'articles 2',
        createdAt:new Date(),
        decsription:'Description 2'
    }]
    res.render('articles/index',{articles:articles});
})


app.use('/articles',articleRouter);

app.listen(5000);