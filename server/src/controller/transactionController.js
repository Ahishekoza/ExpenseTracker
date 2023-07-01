import transactionModel from "../models/transactionModel.js";
import moment from 'moment'

export const createTransaction = async (req, res) => {
    const { amount,type, category, userId, description, date, reference } = req.body;
    await transactionModel
    .create({
      amount: amount,
      type: type,
      category: category,
      user: userId,
      description: description,
      date: date,
      reference: reference,
    })
    .then((response)=>{
        return res.status(200).json({
            sucess: true,
            message:"Transaction created successfully",
            transaction:response
        })
    }).catch((err) => {
        return res.status(500).json({
            sucess: false,
            message: `${err.message}`
        })
    })
};


export const getAllTransactions = async(req,res) => {
    const {userId,frequency,selectDate,type} = req.body
    await transactionModel.find({
       ...(frequency!=="custom" ? {
        date: {
            $gt: moment().subtract(Number(frequency), "d").toDate(),
        },
       }:{
        date:{
            $gte:selectDate[0],
            $lte:selectDate[1]
        }
       }),
        user:userId,
        ...(type !=='All' && {type:type})
    }).then((response)=>{
        return res.status(200).json({
            sucess: true,
            Transactions: response
        })
    }).catch((err) => {
        return res.status(500).json({
            sucess: false,
            message: `${err.message}`
        });
    })
}

export const updateTransaction = async(req, res) => {
  const { transactionId,amount,type, category, userId, description, date, reference } = req.body;

  await transactionModel.findByIdAndUpdate({_id:transactionId},
    {amount:amount,type:type,category:category,userId:userId,description:description,date:date,reference:reference}).then((resposne)=>{
        return res.status(200).json({
            success:true,
            message:"Value Updated successfully"
        })
    }).catch((err)=>{
        return res.status(500).json({
            success:false,
            message:`Failed to Update Value ${err.message}`
        })
    })

}


export const deleteTransaction = async(req, res) => {
    const { transactionId} = req.body

    await transactionModel.findOneAndDelete({_id: transactionId}).then((response)=>{
        return res.status(200).json({
            success:true,
            message:`Successfully deleted ${response}`
        })

    }).catch((error)=>{
        return res.status(404).json({
            success:false,
            message:`Failed to delete ${error.message}`
        })
    })
}
