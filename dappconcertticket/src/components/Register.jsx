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

    <div className='m-20'>

    <label >First Name</label><br/>
    <input type="text"  id="firstname"  placeholder="firstname" onChange={e => setfirstname(e.target.value)} />
    
    </div>

    <div >

    <label >Last Name</label><br/>
    <input type="text"  id="lastname"  placeholder="lastname" onChange={e => setlastname(e.target.value)}/>
    
    </div>
    <div className='m-10'>

    <button  type="submit" className="btn btn-primary" onClick={() => handleClick()}>Submit</button>
    </div>
    </div>
  )
}

export default Register