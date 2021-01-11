const express=require('express')
const bodyparser=require('body-parser')
const ejs=require('ejs')
const app=express()
const mongodb=require('mongodb').MongoClient
const { connect } = require('mongodb')
const { response } = require('express')
mongodb.connect('mongodb+srv://:@cluster0.xxohz.mongodb.net/recipe?retryWrites=true&w=majority',{
useUnifiedTopology:true})
.then(client=>{
    const db=client.db('recipe')
    const recipecollection=db.collection('webapp')
    console.log('connect to database')
    app.use(bodyparser.json())
    app.set('view engine','ejs')
    app.use(bodyparser.urlencoded({extended:true}))
    app.get('/form',function(req,res){
        res.render('form')
    })
    app.get('/',function(req,res){
        res.render('master')
    })
    app.post('/recipe',function(req,res){ 
        recipecollection.insertOne(req.body) 
        // console.log(req.body)
        .then(result=>{
        recipecollection.find().toArray()
        .then(result=>{
            res.render('recipe',{
                recipes:result
            })
        })  
        })
    })
    app.get('/recipe',function(req,res){
    recipecollection.find().toArray()
    .then(result=>{
            res.render('recipe',{
                recipes:result
        })
    })
    })
   
})
.catch(error=>{
    console.log(error)
})
app.listen(8000,function(){
    console.log('hello')
})

