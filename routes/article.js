const express= require('express');
const Article= require('../models/article')
const router= express.Router()


router.get('/new',(req,res)=>{
    res.render('articles/new',{article: new Article()});
})

router.get('/:id',async (req,res)=>{
    const article= await Article.findById(req.params.id)
    if(article==null)
        res.redirect('/')
    res.send('articles/show',{article:article})

})

router.post('/', async (req,res)=>{
    let article= new Article({
        title:req.body.title,
        description:req.body.description,
        markdown:req.body.markdown
    })
    try{
        await article.save();
        // this id is created by the mongoose automatically
        res.redirect(`/articles/${article.id}`)
    }catch(e){
        console.log(e);
        res.render('articles/new',{article:article});
    }
})


module.exports=router;
