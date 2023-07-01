import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Button, Form, Input, Modal, Select, Table,DatePicker } from "antd";
import { UnorderedListOutlined, AreaChartOutlined ,EditOutlined,DeleteOutlined} from  '@ant-design/icons'
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import moment from  'moment'
import Analytics from "./Analytics";
const { RangePicker } = DatePicker;


const MainPage = () => {
  // eslint-disable-next-line 
  const [user, setUser] = useAuth();

  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line
  const [loading,setLoading] = useState(false);
  const [transactions,setTransactions] = useState([]);
  const [frequency,setfrequency] = useState('7')
  const [selectDate,setSelectDate] = useState([])
  const [type,setType] = useState("All")
  const [viewData,setViewData] = useState("table")
  const [edit ,setEdit] = useState(null)

  // Table Columns
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
      render: (text,record)=>(
        <div>
          <EditOutlined onClick={()=>{
            setEdit(record)
            setShowModal(true)
        
          }}/>
          <DeleteOutlined className="mx-3" onClick={()=>handleDelete(record._id)}/>
        </div>
      )
    },
  ];

  const handleDelete =async(id)=>{
    await axios.post(`${process.env.REACT_APP_EXPENSE_API}deleteTransaction`,{transactionId:id}).then((response)=>{
      if(response.data.success){
        alert("Transaction deleted successfully")
        window.location.reload()
      }
    }).catch((error)=>{
      console.log(error)
    })
  }
  
  const handleTransaction = async (event) => {
    const amount = event.amount;
    const type = event.type;
    const category = event.category;
    const date = event.date;
    const reference = event.reference;
    const description = event.description;


    if(edit !==null){
      const transactionId = edit._id
      await axios.put(`${process.env.REACT_APP_EXPENSE_API}updateTransaction`,{transactionId: transactionId,amount: amount,type:type,
        category:category,date:date,reference:reference,description:description}).then((response)=>{
         if(response.data.success){
          alert(`${response.data.message}`)
          
          window.location.reload()
         }
        })
    }


    else{
      await axios.post(`${process.env.REACT_APP_EXPENSE_API}createTransaction`, {
        amount: amount,
        type: type,
        category: category,
        userId: user?._id,
        date: date,
        reference: reference,
        description: description,
      }).then((response)=>{
        setTimeout(()=>{
          alert("Transaction added successfully")
        },900)
        setShowModal(false)
      }).catch((error)=>{
        setTimeout(()=>{
          console.log(error)
          alert(`${error.message}`)
        },1000)
      })
    }
  };



  useEffect(()=>{
    const getAllTransactions = async() =>{
      const userId =  user._id
  
      setLoading(true)
      await axios.post(`${process.env.REACT_APP_EXPENSE_API}transactions`,{frequency:frequency,type:type,selectDate:selectDate,userId:userId}).then((response)=>{
        if(response.data.sucess){
          setTransactions(response.data.Transactions)
        }
        setLoading(false)
      }).catch((error)=>{
        alert(`${error.message}`)
      }
      )
    }
    getAllTransactions()
  },[frequency,user._id,selectDate,type,edit])

  return (
    <Layout>
      <div className=" container-fluid filters mt-5">
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values)=> setfrequency(values)}>
            <Select.Option value="7">LAST 1 Week</Select.Option>
            <Select.Option value="30">LAST 1 Month</Select.Option>
            <Select.Option value="365">LAST 1 year</Select.Option>
            <Select.Option value="custom">custom</Select.Option>
          </Select>
          { frequency === 'custom' ? (<><RangePicker value={selectDate}  onChange={(values)=> setSelectDate(values)}/></>): (<></>)}
        </div>
        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(values)=> setType(values)}>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
            <Select.Option value="All">All</Select.Option>
          </Select>
        </div>
        
        <div className="d-flex  align-items-center">
        <div className="card p-2 mx-2">
          <div className=" d-flex align-items">
            <UnorderedListOutlined className={`mx-2 ${viewData==='table'? 'active-icons': 'non-active-icons' }`} onClick={()=>setViewData('table')}/>
            <AreaChartOutlined className={`${viewData==='analytics'? 'active-icons': 'non-active-icons' }`} onClick={()=>setViewData('analytics')}/>
          </div>
        </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="content">
        {viewData === 'table'? <Table columns={columns} dataSource={transactions}/> : <Analytics alltransactions={transactions}/>}
      </div>
      <Modal
        title={edit?  "EDIT TRANSACTION" : "ADD TRANSACTION"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleTransaction} initialValues={edit}>
          <Form.Item label="Amount" name="amount" className="my-2">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">TAX</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" required />
          </Form.Item>
          <Form.Item className="d-flex justify-content-end">
            <Button htmlType="submit" type="primary">
              SAVE
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default MainPage;
