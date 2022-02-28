import { Acount, } from '../models/Acount';
import { Wallet, } from '../models/Wallet';
import { Transaction, } from '../models/Transaction';
import { findByPkDb, createInDb, findOneDb, incremetWallet, decrementWallet } from './db';

interface ITransaction {
  transactionHash: string,
  acountAddress: string,
  addressToken: string,
  amount: string,
};

export interface IsearchOptions {
  acountAddress: string,
  tokenAddress: string,
}

export async function handleDepositEvent(event: any): Promise<string> {
  /**
   * Function to handling event deposit.
   * @param  {any} event - Deposit event.
   * @returns {Promise<string>} String - Deposit saves or deposit alredy exist.
   */
  let transaction: any = await findByPkDb(Transaction, event.transactionHash);
  if (!transaction) {
    let options: ITransaction = {
      transactionHash: event.transactionHash,
      acountAddress: event.returnValues.addressOwner,
      addressToken: event.returnValues.addressToken,
      amount: event.returnValues.amount,
    };
    await createInDb(Transaction, options);

    let account = await findByPkDb(Acount, event.returnValues.addressOwner);
    if (!account) {
      let options: { address: string, } = {
        address: event.returnValues.addressOwner,
      };
      await createInDb(Acount, options);
    }

    let searchOptions: IsearchOptions = {
      acountAddress: event.returnValues.addressOwner,
      tokenAddress: event.returnValues.addressToken,
     };
    let wallet = await findOneDb(Wallet, searchOptions);
    if (!wallet) {
      let options: { tokenAddress: string, acountAddress: string, balans: string} = {
        tokenAddress: event.returnValues.addressToken,
        acountAddress: event.returnValues.addressOwner,
        balans: event.returnValues.amount,
      };
      await createInDb(Wallet, options);
    } else {
      await incremetWallet(wallet, event.returnValues.amount)
    }

    return 'Desosit saves!';
  }

  return 'Desosit already exist!';
};

export async function handleWithdrawEvent(event: any): Promise<string> {
  /**
   * Function to handling event withdraw.
   * @param  {any} event - Withdraw event.
   * @returns {Promise<string>} String - Withdraw saves or withdraw alredy exist.
   */
  let transaction = await findByPkDb(Transaction, event.transactionHash);
  if (!transaction) {
    let options: ITransaction = {
      transactionHash: event.transactionHash,
      acountAddress: event.returnValues.acount,
      addressToken: event.returnValues.token,
      amount: event.returnValues.amount,
    };

    await createInDb(Transaction, options);

    let searchOptions: IsearchOptions = {
      acountAddress: event.returnValues.account,
      tokenAddress: event.returnValues.token,
    };
    let wallet: any = await findOneDb(Wallet, searchOptions);
    if (!wallet) {
      return 'Wallet don`t exists in database!'
    }

    await decrementWallet(wallet, event.returnValues.amount);
    return 'Withdraw saves!';
  }

  return 'Withdraw alredy exist!';
};
