const express= require('express');
const articleRouter= require('./routes/article')
const mongoose= require('mongoose') 
const Article= require('./models/article')
const methodOverride= require('method-override')

const app=express();

mongoose.connect('mongodb://localhost/notes',{ useNewUrlParser: true,useUnifiedTopology: true ,useCreateIndex:true})
        .then(()=>{},(error)=>console.log("Error in connecting with db "+error))

app.set('view engine','ejs');

app.use(express.urlencoded({extended:false}))
// using method override it gives us power to front end to make delete/put request rather just Get/Post request
app.use(methodOverride('_method'))
app.get('/',async (req,res)=>{
    const articles= await Article.find().sort({
        createdAt:'desc'
    });
    res.render('articles/index',{articles:articles});
})


app.use('/articles',articleRouter);

app.listen(5000);