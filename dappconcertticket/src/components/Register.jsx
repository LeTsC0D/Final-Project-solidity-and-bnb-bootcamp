import React from 'react'
import Web3 from "web3";
import { useState, useEffect } from "react"; 
import { useNavigate } from 'react-router-dom';


import {
  getUserAddress,
  register,
  getOwner,
  login
  } from "../Web3Client";
  import { Container, Form,Button } from "react-bootstrap";

  
function Register() {
  const emptyAddress = "0x0000000000000000000000000000000000000000"; 
  const [firstname,setfirstname]=useState("");
  const [lastname,setlastname]=useState("");
  const navigate = useNavigate();

  const handleClick =async ()=> {
    let user= await getUserAddress();
    if(user!=emptyAddress){
      navigate('/home');
    }else{
      let registerUser = await register(firstname,lastname);  
      navigate('/home');
    }
  }

  useEffect(() => {
  const handleInit = async () => {
    let user= await getUserAddress();
    console.log(user);
  };
  handleInit(); 
 }, []);

 

  return (
    <div className="flex justify-center flex-col items-center justify-items-center" >
      <Form className='flex flex-col m-16'>


    <div className='flex justify-start grow m-10'>

    <Form.Label className="bold-label" >First Name</Form.Label><br/>
    <Form.Control type="text"  id="firstname"  placeholder="firstname" onChange={e => setfirstname(e.target.value)} />
    
    </div>

    <div className='flex justify-start grow m-10'>

    <Form.Label className="bold-label" >Last Name</Form.Label><br/>
    <Form.Control type="text"  id="lastname"  placeholder="lastname" onChange={e => setlastname(e.target.value)}/>
    
    </div>
    <div className='m-10  flex justify-center'>

    <Button  type="submit" color="primary" className="card-hover-effect" onClick={() => handleClick()}>Submit</Button>
    </div>
      </Form>
    </div>
  )
}

export default Register