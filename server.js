const express= require('express');
const app=express();
const articleRouter= require('./routes/article')

app.set('view engine','ejs');

app.use('/articles',articleRouter);

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
    res.render('index',{articles:articles});
})

app.listen(5000);