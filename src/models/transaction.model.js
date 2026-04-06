const mongoose = require('mongoose')

transactionSchema = new mongoose.Schema({
    fromAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Account",
        required:[true, "Transaction must be associated with from account"],
        index:true
    },
    tomAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Account",
        required:[true, "Transaction must be associated with to account"],
        index:true
    },
    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED","REVERSED"],
      default: "PENDING",
    },
    amount: {
      type: Number,
      required: true,
    },
    idempotencyKey:{
        type:String,
        required:[true,"Idempotency key is required for creating transaction"],
        index:true,
        unique:true
    }
   
}, {
        timestamps:true
    })

    const Transaction = mongoose.model("Transaction", transactionSchema)


    module.exports = Transaction