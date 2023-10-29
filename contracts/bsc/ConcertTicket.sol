// SPDX-License-Identifier: MIT
pragma solidity 0.8.12;
import "../../node_modules/@openzeppelin/contracts/utils/Counters.sol"; 
import "../../node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract ConcertTicket is ReentrancyGuard {

  //Counter  
  using Counters for Counters.Counter;
  Counters.Counter private _counter;

    //owner 
  address private owner;

  //totalPayments
  uint private totalPayments;

    //user structs 
  struct User{
    address walletAddress;
    string name;
    string lastname;
    uint ticketId;
    uint balance;
  }

struct Ticket {
        uint id;
        uint seatno;
        string seatcolor;
        string addittionalfeature;
        Status status; 
    }

  //enum to indicate the status of the car
  enum Status{
    Available,
    InUse
  }

  //ticket struct by TicketType
  struct TicketType{
    uint id;
    string name;
    string imgUrl;
    uint buyPrice;
    uint noOfTicketAvailable;
    TypeOfTicket typeOfTicket;
    Ticket[] tickets;
  }

//   uint public idTicketType=0;


  //enum to indicate the status of the car
  enum TypeOfTicket{
    Frontstage,
    Backstage,
    General,
    Vip,
    Others
  }

  //events
  event TicketTypeAdded(uint indexed id,string name,string imgUrl,uint buyPrice,uint noOfTicketAvailable,TypeOfTicket typeOfTicket);
  event TicketTypeMetadataEdited(uint indexed id,string name,string imgUrl,uint buyPrice,uint noOfTicketAvailable,TypeOfTicket typeOfTicket);
  event TicketAdded(uint indexed id,uint indexed seatno,string seatcolor,string addittionalfeature);
  event UserAdded(address indexed walletAddress,string name,string lastname);
  event Deposit(address indexed walletAddress,uint amount);
  event CheckOut(address indexed walletAddress,uint indexed ticketId);
  event PaymentMade(address indexed walletAddress,uint amount);
  event BalanceWithdrawn(address indexed walletAddress,uint amount);
  event CheckIn(address indexed walletAddress,uint indexed typeofticket,uint indexed tickedid);

  //user mapping 
  mapping(address => User) private users;
//   users[0]=Ticket(0,"admin","url",buyPrice,noOfTicketAvailable,typeOfTicket);

  //car mapping 
  mapping(uint => TicketType) private ticketTypes;

  //constructor
  constructor(){
    owner = msg.sender;
    totalPayments=0;
  }

  //MODIFIERS
  //onlyOwner
  modifier onlyOwner(){
    require(msg.sender == owner,"Only the owner can call this function");
    _;
  }


  //FUNCTIONS
  //Execute Functions 

  //setOwner #onlyOwner
  function setOwner(address _newOwner) external onlyOwner{
    owner = _newOwner;
  }

  //addUser #nonExisting 
  function addUser(string calldata name, string calldata lastname) external {
    require(!isUser(msg.sender),"User already exists");
    users[msg.sender] = User(msg.sender,name,lastname,0,0);
    emit UserAdded(msg.sender,users[msg.sender].name,users[msg.sender].lastname);
  }


  //addTicketType #onlyOwner #nonExistingTicketType
  function addTicketType(string calldata name,string calldata url,uint buyPrice,uint noOfTicketAvailable,uint typeOfTicket) external onlyOwner{
    _counter.increment();
    uint counter=_counter.current();
    ticketTypes[counter].id=counter;
    ticketTypes[counter].name=name;
    ticketTypes[counter].imgUrl=url;
    ticketTypes[counter].buyPrice=buyPrice;
    ticketTypes[counter].noOfTicketAvailable=noOfTicketAvailable;
    if(typeOfTicket==0){
    ticketTypes[counter].typeOfTicket=TypeOfTicket.Backstage;
    }else if(typeOfTicket==1){
    ticketTypes[counter].typeOfTicket=TypeOfTicket.Frontstage;
    }else if(typeOfTicket==2){
    ticketTypes[counter].typeOfTicket=TypeOfTicket.General;
    }else if(typeOfTicket==3){
    ticketTypes[counter].typeOfTicket=TypeOfTicket.Vip;
    }else{
    ticketTypes[counter].typeOfTicket=TypeOfTicket.Others;  
    }
    emit TicketTypeAdded(counter,ticketTypes[counter].name,ticketTypes[counter].imgUrl,ticketTypes[counter].buyPrice,ticketTypes[counter].noOfTicketAvailable,ticketTypes[counter].typeOfTicket);
  }

  //editTicketTypeMetadata #onlyOwner  #existingTicketType
  function editTicketMetadata(uint id,string calldata name,string calldata imgUrl,uint buyPrice,uint noOfTicketAvailable,uint typeOfTicket) external onlyOwner{
    require(ticketTypes[id].id != 0, "Ticket with give ID does not exist");
    TicketType storage ticketType=ticketTypes[id];
    if(bytes(name).length != 0){
      ticketType.name=name;
    }
    if(bytes(imgUrl).length !=0 ){
      ticketType.imgUrl = imgUrl;
    }
    if(buyPrice>0){
      ticketType.buyPrice=buyPrice;
    }
    if(noOfTicketAvailable>0){
      ticketType.noOfTicketAvailable=noOfTicketAvailable;
    }

    if(typeOfTicket==0){
    ticketType.typeOfTicket=TypeOfTicket.Backstage;
    }else if(typeOfTicket==1){
    ticketType.typeOfTicket=TypeOfTicket.Frontstage;
    }else if(typeOfTicket==2){
    ticketType.typeOfTicket=TypeOfTicket.General;
    }else if(typeOfTicket==2){
    ticketType.typeOfTicket=TypeOfTicket.Vip;
    }else{
    ticketType.typeOfTicket=TypeOfTicket.Others;   
    }    
    emit TicketTypeMetadataEdited(id,ticketType.name,ticketType.imgUrl,ticketType.buyPrice,noOfTicketAvailable,ticketType.typeOfTicket);
  }

  //addTicket #existing TicketType
  function addTicket(uint id,uint seatno,string calldata color,string calldata additionalfeature,Status status) external  onlyOwner{
    uint count=ticketTypes[id].tickets.length;
    Ticket memory ticket=Ticket(count,seatno,color,additionalfeature,status);
    ticketTypes[id].tickets.push(ticket);
    emit TicketAdded(count,seatno, color, additionalfeature);
  }

  //checkout #existingUser #isCarAvailable #userHasNotRentedACar #UserHasNoDebt
  function checkOut(uint id,uint ticketid)external {
    require(isUser(msg.sender),"user does not exists");
    require(ticketTypes[id].noOfTicketAvailable > 0,"Car is not Available to use");

    ticketTypes[id].noOfTicketAvailable -=1;
    ticketTypes[id].tickets[ticketid].status=Status.InUse;
    emit  CheckOut(msg.sender,id);
  }

  //checkIn #existingTypeofTicket #existingTicket
  function checkIn(uint typeofTicket,uint tickedid) external{
    require(isUser(msg.sender),"User dooe snot exists");
    ticketTypes[typeofTicket].tickets[tickedid].status=Status.Available;
    emit CheckIn(msg.sender,typeofTicket,tickedid);
  }

  //deposit #existingUser
  function deposit() external payable  {
    require(isUser(msg.sender),"User does not exist");
    users[msg.sender].balance+=msg.value;

    emit Deposit(msg.sender,msg.value);
  }


  //makePayment #existingUser #existingDebt #sufficientBalance
  function makePayment(uint buyPrice) external{
    require(isUser(msg.sender),"User does not exists");

    uint balance =users[msg.sender].balance;

    require(balance>=buyPrice,"User has unsufficient balance");

    totalPayments+=buyPrice;
    users[msg.sender].balance-=buyPrice;
    emit PaymentMade(msg.sender,buyPrice);
  }


  //withdrawBalance #existingUser 
  function withdrawBalance(uint amount) external nonReentrant {
    require(isUser(msg.sender),"User does not exist");
    uint balance = users[msg.sender].balance;
    require(balance >= amount, "Insufficient balance to withdraw");
    // unchecked {
      users[msg.sender].balance-=amount;
    // }
    (bool success,)=msg.sender.call{value:amount}("");
    require(success,"Transfer failed");
    emit BalanceWithdrawn(msg.sender,amount);
  } 


  //withdrawOwnerBalance #onlyOwner
  function withdrawOwnerBalance(uint amount) external onlyOwner{
    require(totalPayments >=amount,"Insufficient contract balance to withdraw");
    (bool success, )=owner.call{value:amount}("");
    require(success,"Transfer failed");
    unchecked{
    totalPayments-= amount;
    }
  }

  //Query Function 


  //get Owner 
  function getOwner() external view returns(address) {
    return owner;
  }

  //isUser 
  function isUser(address walletAddress)private view returns(bool){
    return users[walletAddress].walletAddress !=address(0);
  }

  //getUser #existingUser 
  function getUser(address walletAddress) external view returns(User memory){
    require(isUser(walletAddress),"User does not exists");
    return users[walletAddress];
  }

  //getTicketByTypeOfTicket
  function getTypeOfTicket(uint id) external view returns(TicketType memory){
    return ticketTypes[id];
  }

  //getalltickettypes
  function getALLTypeOfTicket() external view returns(TicketType[] memory){
    uint counter=_counter.current();
    TicketType[] memory allTypeOfTicket = new TicketType[](counter);
    for(uint i=1;i<=counter;i++){
      allTypeOfTicket[i-1]=ticketTypes[i];
    }
    return allTypeOfTicket;
  }

  //getTicket #existingTicket
  function getAllTicketsByTypeOfTicket(uint id) external view returns (Ticket[] memory){
    uint count=ticketTypes[id].tickets.length;
    Ticket[] memory tickets = new Ticket[](count);
    for(uint i=1;i<= count;i++){
      tickets[i]=ticketTypes[id].tickets[i];
    }    
    return tickets;
  }

  function getTicketByTypeOfTicket(uint id,uint ticketid)external view returns (Ticket memory){
    // require(ticketTypes[typeOfTicket].tickets[ticketid].id !=0 , "Ticket does not exists"); 
    return ticketTypes[id].tickets[ticketid];
  }



  //getCurrentCount
  function getCurrentCount() external view returns(uint){
    return _counter.current();
  }


  //getContractBalance  #onlyOwner
  function getContractBalance() external view onlyOwner returns(uint){
    return address(this).balance;
  }


  //getTotalPayment #onlyOwner
  function getTotalPayments() external view onlyOwner returns(uint){
    return totalPayments;
  }

}
