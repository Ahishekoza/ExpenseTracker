import { Progress } from "antd";
import React from "react";

const Analytics = ({ alltransactions }) => {

  const categories = [
    "salary",
    "tip",
    "project",
    "food",
    "movie",
    "bills",
    "medical",
    "fee",
    "tax",
  ];

  const totalTransactions = alltransactions.length;
  const totalIncomeTransactions = alltransactions.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpensesTransactions = alltransactions.filter(
    (transaction) => transaction.type === "expense"
  );

  const totalIncomePercent =
    (totalIncomeTransactions.length / totalTransactions) * 100;
  const totalExpensePercent =
    (totalExpensesTransactions.length / totalTransactions) * 100;



  const totalTurnOver = alltransactions.reduce((acc, transaction) => acc + transaction.amount,0)
  const totalIncomeTurnOver =  alltransactions.filter(transaction => transaction.type === "income").reduce((acc, transaction) => acc + transaction.amount,0)
  const totalExpenseTurnOver =  alltransactions.filter(transaction => transaction.type === "expense").reduce((acc, transaction) => acc + transaction.amount,0)
  
  const totalIncomeTurnOverPercentage = (totalIncomeTurnOver/totalTurnOver)*100
  const totalExpenseTurnOverPercentage = (totalExpenseTurnOver/totalTurnOver)*100

  console.log(totalIncomeTurnOverPercentage , totalExpenseTurnOverPercentage)

  return (
    <>
      <div className="row m-2">
      {/* Percentage */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="text-success">
                Income : {totalIncomeTransactions.length}
              </h5>
              <h5 className="text-danger">
                Expense : {totalExpensesTransactions.length}
              </h5>
              <Progress strokeColor={"green"} type="circle" percent={totalIncomePercent.toFixed(0)}/>
              <Progress className="mx-2" strokeColor={"red"} type="circle" percent={totalExpensePercent.toFixed(0)}/>
            </div>
          </div>
        </div>

        {/* TurnOver */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="text-success">
                Income : {totalIncomeTurnOver}
              </h5>
              <h5 className="text-danger">
                Expense : {totalExpenseTurnOver}
              </h5>
              <Progress strokeColor={"green"} type="circle" percent={totalIncomeTurnOverPercentage.toFixed(0)}/>
              <Progress className="mx-2" strokeColor={"red"} type="circle" percent={totalExpenseTurnOverPercentage.toFixed(0)}/>
            </div>
          </div>
        </div>

        <div className="row my-2">
          
          <div className="col-md-4">
          <h5>CategoryWise Income</h5>
            { 
            categories.map((category)=>{
              const amount = alltransactions.filter(transaction => transaction.type === 'income' && transaction.category === category)
              .reduce((acc,transaction)=>acc+transaction.amount,0)
              return(
                amount ? 
                <div className="card">
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress percent={((amount/totalTurnOver)*100).toFixed(0)}/>
                  </div>
                </div>
                :
                <></>
              )
            })
            }
          </div>

          <div className="col-md-4">
          <h5>CategoryWise Expenses</h5>
            { 
            categories.map((category)=>{
              const amount = alltransactions.filter(transaction => transaction.type === 'expense' && transaction.category === category)
              .reduce((acc,transaction)=>acc+transaction.amount,0)
              return(
                amount ? 
                <div className="card">
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress percent={((amount/totalTurnOver)*100).toFixed(0)}/>
                  </div>
                </div>
                :
                <></>
              )
            })
            }
          </div>
        </div>
          
         
      
      </div>
    </>
  );
};

export default Analytics;
