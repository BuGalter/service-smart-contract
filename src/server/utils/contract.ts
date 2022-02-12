import { Acount, } from '../models/Acount';
import { Wallet, } from '../models/Wallet';
import { Transaction, } from '../models/Transaction';
import { findByPkDb, createInDb, findOneDb, incremetWallet, decrementWallet } from './db';


export async function handleDepositEvent(event) {
  let transaction = await findByPkDb(Transaction, event.transactionHash);
  if (!transaction) {
    let options = {
      transactionHash: event.transactionHash,
      acountAddress: event.returnValues.addressOwner,
      addressToken: event.returnValues.addressToken,
      amount: event.returnValues.amount,
    };
    await createInDb(Transaction, options);

    let account = await findByPkDb(Acount, event.returnValues.addressOwner);
    if (!account) {
      let options = {
        address: event.returnValues.addressOwner,
      };
      await createInDb(Acount, options);
    }

    let searchOptions = {
      acountAddress: event.returnValues.addressOwner,
      tokenAddress: event.returnValues.addressToken,
     };
    let wallet = await findOneDb(Wallet, searchOptions);
    if (!wallet) {
      let options = {
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

export async function handleWithdrawEvent(event) {
  let transaction = await findByPkDb(Transaction, event.transactionHash);
  if (!transaction) {
    let options = {
      transactionHash: event.transactionHash,
      acountAddress: event.returnValues.acount,
      addressToken: event.returnValues.token,
      amount: event.returnValues.amount,
    };

    await createInDb(Transaction, options);

    let searchOptions = {
      acountAddress: event.returnValues.account,
      tokenAddress: event.returnValues.token,
    };
    let wallet = await findOneDb(Wallet, searchOptions);
    if (!wallet) {
      return 'Wallet don`t exists in database!'
    }

    await decrementWallet(wallet, event.returnValues.amount);
    return 'Withdraw saves!';
  }

  return 'Withdraw alredy exist!';
};
