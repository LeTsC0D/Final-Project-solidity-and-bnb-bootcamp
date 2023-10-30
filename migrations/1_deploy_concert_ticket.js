const fs=require("fs");
const ConcertTicket = artifacts.require("ConcertTicket");
module.exports = async function (deployer) {
  await deployer.deploy(ConcertTicket);
  const instance = await ConcertTicket.deployed();
  let concertTicketAddress = await instance.address;
  let config = "export const concertTicketAddress = " + concertTicketAddress;
  console.log("concertTicketAddress = " + concertTicketAddress);
  let data = JSON.stringify(config);
  fs.writeFileSync("config.js", JSON.parse(data));
  };