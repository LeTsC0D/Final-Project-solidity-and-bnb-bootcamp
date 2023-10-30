import React from 'react'
import Web3 from "web3";
import { useState, useEffect } from "react"; 
import Dropdown from 'react-bootstrap/Dropdown';
import { 
  Card, CardImg, CardBody, 
  CardTitle, CardText, Button,CardSubtitle
} from "reactstrap"
import {
  getUserAddress,
  register,
  getOwner,
  login,addTicketType,getTypeOfTicket,getCurrentCount,addTicket,getALLTypeOfTicket

  } from "../Web3Client";
  import { Link } from 'react-router-dom'; // Assuming you are using React Router
  import "./UI/CardWithHoverEffect.css";
  import { Container, Form } from "react-bootstrap";


function Dashboard() {
  const [ticketname,setticketname]=useState("");
  const [imageurl,setimageurl]=useState("");
  const [buyprice,setbuyprice]=useState(0);
  const [ticketavailable,setticketavailable]=useState(0);
  const [typrofticket,settyprofticket]=useState("option1");
  const [counttype,setcounttype]=useState(0);
 const [addTicketTypes,settickettypes]=useState([]);
  const handleSelect = (eventKey) => {
    settyprofticket(eventKey.target.value);

  };
  // function delay(ms) {
  //   return new Promise(resolve => setTimeout(window.location.reload(), ms));
  // }

  const handleClick =async ()=> {
    const buypricet=parseInt(buyprice);
    const ticketavailablet=parseInt(ticketavailable);
    const typroftickett=parseInt(typrofticket);
    console.log(buypricet,typeof(buypricet))
    console.log(ticketavailablet,typeof(ticketavailablet))
    console.log(typroftickett,typeof(typroftickett))
    let ticketype= await addTicketType(ticketname,imageurl,buypricet,ticketavailablet,typroftickett);
    // console.log(ticketype)
    // setcounttype(counttype+1)
    // window.location.reload();
    // await delay(10000); 
    // const timeoutId = setTimeout(() => {
    //   window.location.reload();
    // }, 10000);

    // clearTimeout(timeoutId);

  }

  useEffect(() => {



    const handleInit = async () => {

      let count=await getCurrentCount();
      
      console.log(count)
  
      let gettickettype = await getALLTypeOfTicket();
      settickettypes(gettickettype);
      // console.log(addTicketTypes)
      // setcounttype(count);
      // console.log(counttype)

    };
    handleInit(); 
    
   }, []);

  

  return (
    <div>
      <div className="flex justify-center grow flex-col items-center justify-items-center">

      <Form className='flex flex-col m-16'>
        <div className='flex justify-start grow m-2'>
        <Form.Label className="bold-label">Ticket Name</Form.Label>
        <Form.Control type="text"  id="firstname"  placeholder="ticket name" onChange={e => setticketname(e.target.value)} />
        </div>
        <div className='flex justify-start grow m-2'>
        <Form.Label className="bold-label">Ticket image url</Form.Label><br/>
        <Form.Control type="text"  id="firstname"  placeholder="image url" onChange={e => setimageurl(e.target.value)} />
        </div>
        <div className='flex justify-start grow m-2'>
        <Form.Label className="bold-label">Ticket buy price</Form.Label><br/>
        <Form.Control type="text"  id="firstname"  placeholder="buy price" onChange={e => setbuyprice(e.target.value)} />
        </div>
        <div className='flex justify-start grow m-2'>
        <Form.Label className="bold-label">No of Ticket Available</Form.Label><br/>
        <Form.Control type="text"  id="firstname"  placeholder="number of ticket available" onChange={e => setticketavailable(e.target.value)} />
        </div>     
        <div className='flex justify-start grow m-2'>
        <Form.Label className="bold-label">Type of Ticket</Form.Label><br/>

<Form.Select aria-label="Default select example" value={typrofticket} onChange={(e)=>handleSelect(e)}>
      <option value="1">Frontstage</option>
      <option value="2">Backstage</option>
      <option value="3">General</option>
      <option value="4">Vip</option>
      <option value="5">Others</option>      
    </Form.Select>

        </div> 
        <div className='m-10  flex justify-center'>

        <Button  type="submit" color="primary" className="card-hover-effect" onClick={() => handleClick()}>Submit</Button>
        </div>                     
  
      </Form>

        </div>
    <div className='flex flex-row justify-around flex-wrap  overflow-y mt-10 mb-20 space-x-4 space-y-4'>
      {
addTicketTypes.length>0 ?
addTicketTypes.map((value,index)=>{
        return (
          <div key={index}>
      <Card className="card-hover-effect"
        style={{
          width: '18rem'
        }}
      >
        <img
          alt="Sample"
          src="https://media.istockphoto.com/id/1318626501/vector/vector-illustration-concert-ticket-design-template-for-party-or-festival.jpg?s=612x612&w=0&k=20&c=mFdE63pP7j8ZnULrWH0TW5c3o_aE_jDlZW-E_PVvYz8="
        />
        <CardBody>
          <CardTitle tag="h5">
            {value[1]}
          </CardTitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
           {value[2]}
          </CardSubtitle>
          <CardText>
          {value[3]},{value[4]}
          </CardText>
          <Button style={{color:"white",backgroundColor:"white"}}>
          <Link to={`/add-ticket/${value[0]}`}><div>BOOK / ADD</div></Link>
          </Button>
        </CardBody>
      </Card>
          </div>

        )}
        
        ) : <div></div>

      }


    </div>

    </div>
  )
}

export default Dashboard