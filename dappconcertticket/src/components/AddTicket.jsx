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
  import "./UI/CardWithHoverEffect.css";
  import { Container, Form } from "react-bootstrap";

function AddTicket() {
    const { data } = useParams();
    const [dataparam,setdataparam]=useState(0);
    const [addTickets,settickets]=useState([]);

    const [seatno,setseatno]=useState(0);
    const [color,setcolor]=useState(0);
    const [additionalfeature,setadditionalfeature]=useState(0);

    const [statusofticket,settyprofticket]=useState("option1");
    const handleSelect = (e) => {
        settyprofticket(e.target.value);
      };

      // function delay(ms) {
      //   return new Promise(resolve => setTimeout(window.location.reload(), ms));
      // }

      
      const handleClick =async ()=> {
        console.log(data)
        // setdataparam(data);
        console.log(parseInt(statusofticket))
        let ticketype= await addTicket(data,seatno,color,additionalfeature,parseInt(statusofticket));
        // console.log(ticketype)
        // setcounttype(counttype+1)
      //  window.location.reload();
      //  const timeoutId = setTimeout(() => {
      //   window.location.reload();
      // }, 20000);
  
      // clearTimeout(timeoutId);
      // await delay(10000); 
      }

  useEffect(() => {
    const handleInit = async () => {
      console.log("reload",data)

    //   let count=await getCurrentCount();
      // var temp=[];
    //   console.log(count)
      let getticket = await getAllTicketsByTypeOfTicket(data);
      console.log(getticket)
      if(getticket !=undefined){

        // temp.push(getticket);
        console.log(getticket)
        settickets(getticket);
      }else{
        settickets([]);
      }
        
      
      // setcounttype(count);
    //   console.log(counttype)

    };
    handleInit(); 
   }, []);

  return (
    <div>
      <div className="flex justify-center flex-col items-center justify-items-center">
      <Form className='flex flex-col m-16'>

        <div className='flex justify-start grow m-2'>
        <Form.Label className="bold-label" >seat no</Form.Label><br/>
        <Form.Control type="text"  id="seatno"  placeholder="seat no" onChange={e => setseatno(e.target.value)} />
        </div>
        <div className='flex justify-start grow m-2'> 
        <Form.Label className="bold-label" >color</Form.Label><br/>
        <Form.Control type="text"  id="color"  placeholder="color" onChange={e => setcolor(e.target.value)} />
        </div>
        <div className='flex justify-start grow m-2'>
        <Form.Label className="bold-label" >additionalfeature</Form.Label><br/>
        <Form.Control type="text"  id="additionalfeatures"  placeholder="additionalfeature" onChange={e => setadditionalfeature(e.target.value)} />
        </div>
        <div className='flex justify-start grow m-2'>
        <Form.Label className="bold-label" >status of ticket</Form.Label><br/>

        <Form.Select aria-label="Default select example" value={statusofticket} onChange={(e)=>handleSelect(e)}>
        
          <option value="0">Available</option>
          <option value="1">InUse</option>     
      
        </Form.Select>
        </div>   
        <div className='m-10  flex justify-center'>
        <Button  type="submit" color="primary" onClick={() => handleClick()}>Submit</Button>
        </div>                     
      </Form>
        </div>
    <div className='flex grow-0 flex-row justify-around flex-wrap overflow-y mt-10 mb-20 space-x-4 space-y-4'>
      {
addTickets.map((value,index)=>{
        return (
          <div key={index}>
      <Card className="card-hover-effect"
        style={{
          width: '18rem'
        }}
      >
        <img
          alt="Sample" width="150vw"
          src="https://media.istockphoto.com/id/1318626501/vector/vector-illustration-concert-ticket-design-template-for-party-or-festival.jpg?s=612x612&w=0&k=20&c=mFdE63pP7j8ZnULrWH0TW5c3o_aE_jDlZW-E_PVvYz8="
        />
        <CardBody>
          <CardTitle tag="h5">
            {value['seatno']}
            {
              console.log(value[0][0])
            }
          </CardTitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
           {value.seatcolor},
           {
             value.status=="0"?<>Available</>:<>InUse</>
           }
          </CardSubtitle>
          <CardText>
          {value.addittionalfeature}
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

      <div className='mt-20'></div>
    </div>

    </div>
  )
}

export default AddTicket