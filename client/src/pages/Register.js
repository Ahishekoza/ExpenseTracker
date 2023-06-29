import React from "react";
import axios from "axios";
import {useNavigate,Link} from 'react-router-dom'
import Layout from "../components/Layout";
import { Button, Form, Input } from "antd";

const Register = () => {

    const navigate =  useNavigate()

    const handleSubmit = async(event)=>{
        const name =  event.Name
        const email = event.Email
        const password = event.Password


        await axios.post(`${process.env.REACT_APP_EXPENSE_API}registerUser`,{name:name,email: email, password: password}).then((response)=>{
            if(response.data.success){
                alert("User Registered Successfully")
                setInterval(()=>{
                    navigate('/')
                },1000)
            }
        }).catch((error)=>{
            alert(`${error.message}`)
        })
     }

  return (
    <Layout>
      <div className="container registerForm">
        <div className="card">
          <div className="pt-3 text-center">
           <h5 className="card-tile">Register</h5>
          </div>
          
          <div className="card-body">
            <Form onFinish={handleSubmit}>
              <Form.Item label="Name" name="Name" rules={[{required:true,message:"Name is Required"}]}>
              <Input/>  
              </Form.Item>  
              <Form.Item label="Email-Id" name="Email" rules={[{required:true ,type:"email", message:'The input is not valid E-mail!'}]}>
                <Input placeholder="Email"  />
              </Form.Item>
              <Form.Item label="Password" name="Password" rules={[{required:true}]}>
                <Input.Password />
              </Form.Item>
              <div className="text-center my-2">
              <Link to="/login">Already Registered ?  Click here to Login</Link>
              </div>
              <Form.Item className="text-center" >  
                <Button htmlType="submit" type="primary">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
