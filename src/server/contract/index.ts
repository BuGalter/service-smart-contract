import { web3, } from "../web3";
import { AbiItem, } from "web3-utils";
import config from "../config/config";
import contractAbi from './contract-abi.json';
import { handleDepositEvent, handleWithdrawEvent, } from "../utils/contract";

export const contract = new web3.eth.Contract(contractAbi as AbiItem[], config.contract.adress);

export async function handlingEventsDeposit(events) {
  for (let index = 0; index < events.length; index++) {
    let result = await handleDepositEvent(events[index]);
    console.log(result);
  }

  return 'All deposit saves!';
};

export async function handlingEventsWithdraw(events) {
  for (let index = 0; index < events.length; index++) {
    let result = await handleWithdrawEvent(events[index]);      
    console.log(result);
  }
  
  return 'All withdraws saves!';
};
