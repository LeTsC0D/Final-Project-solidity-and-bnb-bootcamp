import Web3 from "web3"; 
import RenterABI from "./ABI/ConcertTicket.json"; 
let selectedAccount; 
let concertTicket; 
let isInitialized = false; 
let concertTicketAddress = "0x6291098677656a2A878144A77d706A6508e39a89";

export const init = async () => { 
    // Configure contract 
let provider = window.ethereum; 
if (typeof provider !== "undefined") { 
    provider 
    .request({ method: "eth_requestAccounts" }) 
    .then((accounts) => { 
        selectedAccount = accounts[0]; 
    }) 
    .catch((err) => { 
        // consoLe.log(err); 
        return; 
    }); 
} 
window.ethereum.on("accountChanged", function (accounts) { 
    selectedAccount = accounts[0]; 
}); 

const web3 = new Web3(provider); 
const networkId = await web3.eth.net.getId(); 
concertTicket = new web3.eth.Contract(RenterABI.abi, concertTicketAddress); 
isInitialized = true; 
 } ; 


 export const getUserAddress = async () => { 
    if (!isInitialized) { 
        await init(); 
    } 
    return selectedAccount; 
}; 

// Execute Functions 
export const setOwner = async (newOwner) => { 
    if (!isInitialized) { 
        await init(); 
    } 
    try { 
    let res = await concertTicket.methods 
    .setOwner(newOwner.toLowerCase()) 
    .send({ from: selectedAccount }); 
    return res; 
} catch(e) { 
    console.error(e); 
    }
};

export const register = async (name, surname) => { 
    if (!isInitialized) { 
        await init(); 
    } 
    try { 
        let res = await concertTicket.methods 
        .addUser(name, surname) 
        .send({ from: selectedAccount }); 
        return res; 
    } catch(e) { 
         console.error(e); 
    }
}; 

export const login = async () => {
    if (!isInitialized) {
        await init();
    }
    try {
     let res = await concertTicket.methods.getUser(selectedAccount).call();  
      return res;
    } catch(e) {
      console.error(e);
    }
};


export const addTicketType = async (name, url, buyprice, noofticketavailable,typeofticket) => { 
    if (!isInitialized) { 
         await init(); 
    } 
    try { 
        let res = await concertTicket.methods 
        .addTicketType(name, url, buyprice, noofticketavailable,typeofticket) 
        .send({ from: selectedAccount }); 
        return res; 
    } catch(e) {  
        console.error(e); 
    } 
}; 


export const getTypeOfTicket = async (id) => {
    if (!isInitialized) {
       await init();
    }
    try {
        // let res = await concertTicket.methods.getTypeOfTicket(id).call();
        // console.log("yes")
        let res = await concertTicket.methods.getTypeOfTicket(1).call();
        // console.log("no")
        return res;
    } catch(e) {
      console.error(e);
    }
};


export const getCurrentCount = async () => {
    if (!isInitialized) {
       await init();
    }
    try {
        let res = await concertTicket.methods.getCurrentCount().call(); 
        return res;
    } catch(e) {
     console.error(e);
    }
};


export const addTicket = async (id, seatno, color, additionalfeature,status) => { 
    if (!isInitialized) { 
         await init(); 
    } 
    try { 
        let res = await concertTicket.methods 
        .addTicketType(id, seatno, color, additionalfeature,status) 
        .send({ from: selectedAccount }); 
        return res; 
    } catch(e) {  
        console.error(e); 
    } 
}; 

export const getAllTicketsByTypeOfTicket = async (id) => {
    if (!isInitialized) {
       await init();
    }
    try {
        // let res = await concertTicket.methods.getTypeOfTicket(id).call();
        // console.log("yes")
        let res = await concertTicket.methods.getAllTicketsByTypeOfTicket(1).call();
        // console.log("no")
        return res;
    } catch(e) {
      console.error(e);
    }
};


export const getALLTypeOfTicket = async () => {
    if (!isInitialized) {
       await init();
    }
    try {
        let res = await concertTicket.methods.getALLTypeOfTicket().call();
        return res;
    } catch(e) {
      console.error(e);
    }
};

