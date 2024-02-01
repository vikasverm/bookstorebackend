const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchem=mongoose.Schema(
    {
        itemName:
        
        {type:String,
            required:true
        },
        itemUrl:
        
        {type:String,
            required:true
        },
        itemPrice:
        
        {type:Number,
            required:true
        },
        
        itemGenres:
        
        {type:String,
            required:true
        },itemQuantity:
        {
          
        type:Number,
        required:true
        },
        userId: 
        { type: String},
    } ,{timestamps:true}
)
const ItemModel=mongoose.model('bookpoint',ItemSchem)
module.exports=ItemModel;