import mongoose from 'mongoose';

const transactionModel = mongoose.Schema({
    amount:{
        type: Number,
        required:[true,'please enter a amount']
    },
    type:{
        type: String,
        required:[true,'please enter a type']
    },
    category:{
        type: String,
        required:[true,'please enter a category']
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    date:{
        type:Date,
        required:[true,'please enter a date']

    },
    reference:{
        type:String
    },
    description:{
        type:String,
        required:[true,'please enter a description']
    }
},{timestamps:true})


export default mongoose.model('transactions',transactionModel)