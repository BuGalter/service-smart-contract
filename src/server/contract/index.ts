import { web3, } from "../web3";
import { AbiItem, } from "web3-utils";
import config from "../config/config";
import contractAbi from './contract-abi.json';
import { handleDepositEvent, handleWithdrawEvent, } from "../utils/contract";

export const contract = new web3.eth.Contract(contractAbi as AbiItem[], config.contract.adress);

export async function handlingEventsDeposit(events: Array<any>): Promise<string> {
  /**
   * Function to handling past events deposit.
   * @param  {Array<any>} events - List of deposit events.
   * @returns {Promise<string>} String - All deposit saves.
   */
  for (let index: number = 0; index < events.length; index++) {
    let result: string = await handleDepositEvent(events[index]);
    console.log(result);
  }

  return 'All deposit saves!';
};

export async function handlingEventsWithdraw(events: Array<any>): Promise<string> {
  /**
   * Function to handling past events withdraw.
   * @param  {Array<any>} events - List of withdraw events.
   * @returns {Promise<string>} String - All withdraw saves.
   */
  for (let index: number = 0; index < events.length; index++) {
    let result: string = await handleWithdrawEvent(events[index]);      
    console.log(result);
  }
  
  return 'All withdraws saves!';
};
