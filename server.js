const express= require("express")
const app = express()
const product= require("./models/productModel")
const mongoose = require('mongoose')

app.use(express.json())
app.get('/',(req,res)=>{
    res.write("Hello Guys,Im junior Backend Engineer")
    res.end()
    
})
app.get('/api/bio',(req,res)=>{
    res.send("My Name is Zaky Al Fatih Nata Imam")
    
})

app.get('/api/bio/profile',(req,res)=>{
    res.send("These are my Profiles")
})

//fetch data  
app.get('/products',async(req,res)=>{
  try {
    const Products= await product.find({})
    res.status(200).json(Products)
  } catch (error) {
    res.status(500).json({messege: error.messege})
  }
  
})

//get product from id
app.get('/products/:id',async(req,res)=>{
  try {
    const {id}= req.params
    const Product= await product.findById(id)
    res.status(200).json(Product)
  } catch (error) {
    res.status(500).json({messege: error.messege})
  }
  
})
//posting data
 app.post('/products',async(req,res)=>{
   try {
     const Product= await product.create(req.body)
     res.status(200).json(Product)
   } catch (error) {
     console.log(error.messege)
     res.status(500).json({messege :error.messege})
   }
 })


 //update or edit data on the database  
 app.put('/products/:id',async(req,res)=>{
    try {
      const {id}= req.params 
      const Product= await product.findByIdAndUpdate(id,req.body)
     //if we cannot find any dat on the database
     if (!Product){
      return res.status(404).json({messege: `we cannot find any product with ID ${id}`})
     }
     const UpdatedProduct = await product.findByIdAndUpdate(id,req.body)
     res.status(200).json(UpdatedProduct)

    } catch (error) {
      console.log(error.messege)
      res.status(500).json({messege :error.messege})
    }
 })

//delete a product 
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    const Product = await product.findByIdAndDelete(id)
    if (!Product) {
      return res.status(404).json({ message: `cannot find any product with ${id}` })
    }
    res.status(200).json(Product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

const port = process.env.PORT || 3000

mongoose.connect("mongodb+srv://admin:admin123@flaykazapi1.hbmv3dd.mongodb.net/node-api?retryWrites=true&w=majority").then(()=>{
    console.log("connected to mongoDB")
    app.listen(
        port,
        () => console.log(`its alive on http://localhost:${port}`)
    )
}).catch((error)=>{
    console.log(error)
})

