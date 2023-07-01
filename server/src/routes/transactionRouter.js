import express from 'express';
import { createTransaction, deleteTransaction, getAllTransactions, updateTransaction } from '../controller/transactionController.js';
const router = express.Router()

// --CreateTransactions --------------------------------
router.post('/createTransaction',createTransaction)

// ----Get All Transactions --------------------------------
router.post('/transactions',getAllTransactions)

// update transactions --------------------------------
router.put('/updateTransaction',updateTransaction)

// Delete transactions --------------------------------
router.post('/deleteTransaction',deleteTransaction)


export default router