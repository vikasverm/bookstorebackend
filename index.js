const express = require('express');
const mongoose = require('mongoose');
const ItemModel=require('./model/Schema')
const stripe=require("stripe")("sk_test_51Oa1TBSHbkVoXBAuWWmNVyksXpDh9ccyIdFXyveZ3tP7DJqZvPP6M5Sbi7P8qSCTGYMHxoAp4HeBkTPyKuSWL8lP00DR7me1Zf")
const cors = require('cors');
const app=express()
const PORT=9000;
app.use(cors())
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/bookpoint')
app.post('/add',async(req,res)=>
{
const body=await req.body;
ItemModel.create({
    itemName:body.itemName,
    itemPrice:body.itemPrice,
    itemGenres:body.itemGenres,
    itemQuantity:body.itemQuantity,
    itemUrl:body.itemUrl,
    userId:body.userId
}).then((item) => res.json(item))
.catch((err) => res.json(err));
})
app.get("/get/:userId", (req, res) => {
  const userId = req.params.userId
    ItemModel.find({userId: userId}).then((item) =>  res.status(201).json(item))
      .catch((err) => res.json(err));
  });
  app.delete("/deleteItem/:id",(req,res)=>
  {
const id=req.params.id;
ItemModel.findByIdAndDelete({ _id: id })
.then((todo) => res.json(todo))
.catch((err) => res.json(err));
})
app.put("/update", async (req, res) => {
  const{_id,itemQuantity,itemPrice}=req.body
   ItemModel.findByIdAndUpdate(_id,{itemQuantity,itemPrice})
    .then((todo) => res.send({todo:"success"}))
    .catch((err) => res.json(err));
  
})
app.post("/api/create-checkout-session",async(req,res)=>
{
  const {products}=req.body;
  const lineItme=products.map((product)=>(
  {
    price_data:
    {
      currency:"inr",
      product_data:
      {
        name:product.itemName,
        images:[product.itemUrl]
      },
      unit_amount:product.itemPrice*100,
    },
    quantity:product.itemQuantity
  }));
  const session=await stripe.checkout.sessions.create({
    payment_method_types:["card"],
    line_items:lineItme,
    mode:"payment",
    success_url:"http://localhost:5173/success",
    cancel_url:"http://localhost:5173/cancel"
  })
  res.json({id:session.id})
})
app.listen(PORT,()=>
console.log("server Created SuccesFully"))