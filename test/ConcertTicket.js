const ConcertTicket = artifacts.require("ConcertTicket");

contract("ConcertTicket", accounts => {
let concertTicket;
const owner = accounts[0];
const user1 = accounts[1];
beforeEach(async () => {
 concertTicket = await ConcertTicket.new();
});
describe("Add user and ticketType", () => {
  it("adds a new user", async () => {
  await concertTicket.addUser("Alice", "Smith", { from: user1 });
    const user = await concertTicket.getUser(user1);
    assert.equal(user.name, "Alice", "Problem with user name");
    assert.equal(user.lastname, "Smith", "Problem with user lastname");
  });
  it("adds a Ticket Type", async () => {
  // const typeOfTicket = 0;
  await concertTicket.addTicketType("yolo ticket", "example url", 10, 5000,0, { from: owner });
  const ticketType = await concertTicket.getTypeOfTicket(1);
  assert.equal(ticketType.name, "yolo ticket", "Problem with car name");
  assert.equal(ticketType.imgUrl, "example url", "Problem with img url");
  assert.equal(ticketType.buyPrice, 10, "Problem with rent fee");
  assert.equal(ticketType.noOfTicketAvailable, 5000, "Problem with sale fee");
  });
});

describe("Add user ,ticketType and ticket ", () => {
  it("adds a new user", async () => {
  await concertTicket.addUser("Alice", "Smith", { from: user1 });
    const user = await concertTicket.getUser(user1);
    assert.equal(user.name, "Alice", "Problem with user name");
    assert.equal(user.lastname, "Smith", "Problem with user lastname");
  });
  
  it("adds a Ticket Type", async () => {
  await concertTicket.addTicketType("yolo ticket", "example url", 10, 5000,0, { from: owner });
  const ticketType = await concertTicket.getTypeOfTicket(1);
  assert.equal(ticketType.name, "yolo ticket", "Problem with ticket name");
  assert.equal(ticketType.imgUrl, "example url", "Problem with img url");
  assert.equal(ticketType.buyPrice, 10, "Problem with buy fee");
  assert.equal(ticketType.noOfTicketAvailable, 5000, "Problem with no of ticket available");
  });

  it("adds a Ticket", async () => {
  await concertTicket.addTicket(1, 10, "yellow", "coke free",0, { from: owner });
  const ticket = await concertTicket.getTicketByTypeOfTicket(1,0);
  assert.equal(ticket.seatno, 10, "Problem with seat no");
  assert.equal(ticket.seatcolor, "yellow", "Problem with seat color");
  assert.equal(ticket.addittionalfeature,"coke free", "Problem with additional features");
  });
});

describe("Deposit token and make payment", () => {
  it("deposits token", async () => {
  await concertTicket.addUser("Alice", "Smith", { from: user1 });
  await concertTicket.deposit({ from: user1, value: 100 });
  const user = await concertTicket.getUser(user1);
  assert.equal(user.balance, 100, "User could not deposit tokens");
  });
  it("makes a payment", async() => {
  await concertTicket.addUser("Alice", "Smith", { from: user1 });
  await concertTicket.deposit({ from: user1, value: 100 });
  await concertTicket.addTicketType("yolo ticket", "example url", 10, 5000,0, { from: owner });
  await concertTicket.addTicket(1, 10, "yellow", "coke free",0, { from: owner });
  await concertTicket.checkOut(1,0, { from: user1 });
  await concertTicket.makePayment(10,{from:user1});
  await concertTicket.checkIn(1,0,{ from: user1 });
  const ticket = await concertTicket.getTicketByTypeOfTicket(1,0);
  assert.equal(ticket.status,0, "Problem with status");  
  const user=await concertTicket.getUser(user1);
  assert.equal(user.balance,90,"something went wrong while trying to make the payment");
  });
});

describe("withdraw balance", () => {
  it("should send the desired amount of tokens to the user", async () => {
  await concertTicket.addUser("Alice", "Smith", { from: user1 });
  await concertTicket.deposit({ from: user1, value: 100 });
  await concertTicket.withdrawBalance(50, { from: user1 });
  const user = await concertTicket.getUser(user1);
  assert.equal(user.balance, 50, "User could not get his/her tokens");
  });   

  it("should send the desired amount of tokens to the owner", async () => {
    await concertTicket.addUser("Alice", "Smith", { from: user1 });
    await concertTicket.deposit({ from: user1, value: 100 });
    await concertTicket.addTicketType("yolo ticket", "example url", 10, 5000,0, { from: owner });
    await concertTicket.addTicket(1, 10, "yellow", "coke free",0, { from: owner });
    await concertTicket.checkOut(1,0, { from: user1 });
    await concertTicket.makePayment(10,{from:user1});
    await concertTicket.checkIn(1,0,{ from: user1 });
    const ticket = await concertTicket.getTicketByTypeOfTicket(1,0);
    assert.equal(ticket.status,0, "Problem with status");  
    const user=await concertTicket.getUser(user1);
    assert.equal(user.balance,90,"something went wrong while trying to make the payment");
    const totalPaymentAmount = await concertTicket.getTotalPayments({ from: owner });
    const amountTowithdraw = totalPaymentAmount - 10;
    await concertTicket.withdrawOwnerBalance(amountTowithdraw, { from: owner });
    const totalPayment = await concertTicket.getTotalPayments({from: owner});
    assert.equal(totalPayment, 10, "Owner could not withdraw tokens");
    });
  });          

});