import express from 'express';
import { createTransaction, getAllTransactions } from '../controller/transactionController.js';
const router = express.Router()

// --CreateTransactions --------------------------------
router.post('/createTransaction',createTransaction)

// ----Get All Transactions --------------------------------
router.post('/transactions',getAllTransactions)

// 


export default router