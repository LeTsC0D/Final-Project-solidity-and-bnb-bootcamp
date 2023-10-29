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

function Dashboard() {
  const [ticketname,setticketname]=useState("");
  const [imageurl,setimageurl]=useState("");
  const [buyprice,setbuyprice]=useState(0);
  const [ticketavailable,setticketavailable]=useState(0);
  const [typrofticket,settyprofticket]=useState(0);
  const [counttype,setcounttype]=useState(0);
 const [addTicketTypes,settickettypes]=useState([]);
  const handleSelect = (eventKey) => {
    settyprofticket(eventKey);

  };

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
    window.location.reload();

  }

  useEffect(() => {
    var temp=[];

    async function someAsyncFunction(item) {
      // Simulating an async operation with a setTimeout
      return new Promise((resolve) => {
        setTimeout(() => {
          getTypeOfTicket(parseInt(item));
        }, 1000);
      });
    }

    const handleInit = async () => {

      let count=await getCurrentCount();
      
      console.log(count)
      var ToGet=[]   
      let gettickettype = await getALLTypeOfTicket();
      settickettypes(gettickettype);
      console.log(addTicketTypes)
      // setcounttype(count);
      console.log(counttype)

    };
    handleInit(); 
    
   }, []);

  

  return (
    <div>
      <div className="flex justify-center flex-col items-center justify-items-center">
        <div>
        <label >Ticket Name</label><br/>
        <input type="text"  id="firstname"  placeholder="ticket name" onChange={e => setticketname(e.target.value)} />
        </div>
        <div>
        <label >Ticket image url</label><br/>
        <input type="text"  id="firstname"  placeholder="image url" onChange={e => setimageurl(e.target.value)} />
        </div>
        <div>
        <label >Ticket buy price</label><br/>
        <input type="text"  id="firstname"  placeholder="buy price" onChange={e => setbuyprice(e.target.value)} />
        </div>
        <div>
        <label >No of Ticket Available</label><br/>
        <input type="text"  id="firstname"  placeholder="number of ticket available" onChange={e => setticketavailable(e.target.value)} />
        </div>     
        <div>
        <label >Type of Ticket</label><br/>
        <Dropdown onSelect={handleSelect}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {typrofticket || 'Select an item'}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="1">Frontstage</Dropdown.Item>
            <Dropdown.Item eventKey="2">Backstage</Dropdown.Item>
            <Dropdown.Item eventKey="3">General</Dropdown.Item>
            <Dropdown.Item eventKey="4">Vip</Dropdown.Item>
            <Dropdown.Item eventKey="5">Others</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </div> 
        <div className='m-10'>

        <button  type="submit" className="btn btn-primary" onClick={() => handleClick()}>Submit</button>
        </div>                     
        </div>
    <div className='flex flex-row justify-around flex-wrap'>
      {

addTicketTypes.map((value,index)=>{
        return (
          <div key={index}>
      <Card
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
)

      }


    </div>

    </div>
  )
}

export default Dashboard