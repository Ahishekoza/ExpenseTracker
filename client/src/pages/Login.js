import React from 'react'
import Layout from '../components/Layout'
import { Button, Form, Input } from "antd";
import {useNavigate,Link } from 'react-router-dom';
import axios from 'axios';

import { useAuth } from '../context/AuthContext';

const Login = () => {

  // eslint-disable-next-line
    const [user,setUser]= useAuth()

    const navigate =  useNavigate()

  

    const handleSubmit =  async(event)=>{
        const email = event.Email
        const password = event.Password

        await axios.post(`${process.env.REACT_APP_EXPENSE_API}login`,{email: email, password: password}).then((response)=>{
            if(response.data.success){
                alert("Successfully logged in")
                setUser({...response.data.User,password:''})
                localStorage.setItem('User', JSON.stringify({...response.data.User,password:'' }))
                navigate('/dashboard/mainpage')
            }
        }).catch((error)=>{
            alert(`${error.message}`)
        })
    }

    // --- If User is logged in then he doesn't need to have go to login page again

    

  return (
    <Layout>
        <div className="container registerForm">
        <div className="card">
          <div className="pt-3 text-center">
           <h5 className="card-tile">Login</h5>
          </div>
          
          <div className="card-body">
            <Form onFinish={handleSubmit}>
              <Form.Item label="Email-Id" name="Email" rules={[{required:true ,type:"email", message:'The input is not valid E-mail!'}]}>
                <Input placeholder="Email"  />
              </Form.Item>
              <Form.Item label="Password" name="Password" rules={[{required:true}]}>
                <Input.Password /> 
              </Form.Item>
              <div className='text-center my-2'>
              <Link to="/register">Not a user ?  Click here to register</Link>
              </div>
              <Form.Item className="text-center" >
                <Button htmlType="submit" type="primary">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Login