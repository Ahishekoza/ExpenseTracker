import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = (props) => {
  return (
    <>
 
    <Header></Header>
    <main style={{minHeight:"100vh"}}>
        {props.children}        
    </main>
    <Footer></Footer>
    </>
  )
}

export default Layout