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
  login,addTicketType,getTypeOfTicket,getCurrentCount,addTicket,getAllTicketsByTypeOfTicket,getALLTypeOfTicket

  } from "../Web3Client";
  import { useParams } from 'react-router-dom';

function AddTicket() {
    const { data } = useParams();
    const [dataparam,setdataparam]=useState(0);
    const [addTickets,settickets]=useState([]);

    const [seatno,setseatno]=useState(0);
    const [color,setcolor]=useState(0);
    const [additionalfeature,setadditionalfeature]=useState(0);

    const [statusofticket,settyprofticket]=useState("");
    const handleSelect = (eventKey) => {
        settyprofticket(eventKey);
      };

      const handleClick =async ()=> {
        setdataparam(data);
        let ticketype= await addTicket(data,seatno,color,additionalfeature);
        // console.log(ticketype)
        // setcounttype(counttype+1)
        window.location.reload();

      }

  useEffect(() => {
    const handleInit = async () => {

    //   let count=await getCurrentCount();
      var temp=[];
    //   console.log(count)
      let getticket = await getAllTicketsByTypeOfTicket(data);
        
      temp.push(getticket);
      settickets(temp);
      console.log(addTickets)
      // setcounttype(count);
    //   console.log(counttype)

    };
    handleInit(); 
   }, []);

  return (
    <div>
      <div className="flex justify-center flex-col items-center justify-items-center">
        <div>
        <label >seat no</label><br/>
        <input type="text"  id="firstname"  placeholder="seat no" onChange={e => setseatno(e.target.value)} />
        </div>
        <div>
        <label >color</label><br/>
        <input type="text"  id="firstname"  placeholder="color" onChange={e => setcolor(e.target.value)} />
        </div>
        <div>
        <label >additionalfeature</label><br/>
        <input type="text"  id="firstname"  placeholder="additionalfeature" onChange={e => setadditionalfeature(e.target.value)} />
        </div>
        <div>
        <label >status of ticket</label><br/>
        <Dropdown onSelect={handleSelect}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {statusofticket || 'Select an item'}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="0">Available</Dropdown.Item>
            <Dropdown.Item eventKey="1">InUse</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </div>   
        <div className='m-10'>
        <button  type="submit" className="btn btn-primary" onClick={() => handleClick()}>Submit</button>
        </div>                     
        </div>
    <div className='flex flex-row justify-around flex-wrap'>
      {

addTickets.map((value,index)=>{
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
          <Button>
            checkout 
          </Button>&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button>
            checkin 
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

export default AddTicket