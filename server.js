const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/productModel')
const app = express()

app.use(express.json())

//routes
app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.get('/blog', (req, res)=>{
    res.send("hello blog")
})

app.get('/products', async(req,res)=>{
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
       res.status(500).json({message: error.message}) 
    }
})

app.get('/products/:id',async(req,res)=>{
    try {
        const{id}=req.params;
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message}) 
    }
})
//update a product

app.put('/products/:id', async(req,res)=>{
    try {
        //get id
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        //we cannot find any product i database
        if(!product){
            return res.status(404).json({message: `cannot find any product with the id ${id}`})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    } catch (error) {

        res.status(500).json({message: error.message}) 
    }
})

app.post('/products',async(req,res)=>{
    // console.log(req.body);
    // res.send(req.body)
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})


//delete a product from database
app.delete('/products/:id', async(req,res)=>{

    try {
        const {id} = req.params
      const product = await Product.findByIdAndDelete(id) 
      if(!product){
        return res.status(404).json({message: `cannot find any product with the id ${id}`})
    } 
    res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

mongoose.
connect('mongodb+srv://sowminisade:272456sowmini@cluster0.rm7ezce.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=>{
    console.log("connected to MongoDb");
    app.listen(3000,()=>{
        console.log('app is running on port 3000')
    })
    
}).catch((error)=>{
    console.log(error);
})