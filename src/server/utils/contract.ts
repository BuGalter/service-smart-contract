import { Acount, } from '../models/Acount';
import { Wallet, } from '../models/Wallet';
import { Transaction, } from '../models/Transaction';
import { web3, } from '../web3';
import { findByPkDb, createInDb, findOneDb, incremetWallet, decrementWallet } from './db';

export async function getAccount(privateKey: string): Promise<string> {
  /**
   * Function find account address on private key.
   * @param  {string} privateKey - User private key.
   * @returns {Promise<string>} acconut.address - User account address.
   */
  try {
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    web3.eth.accounts.wallet.add(account);
    return account.address;
  } catch (err) {
    console.log(err);
  }
}

export async function isTokenInList(tokens: string[], token: string): Promise<boolean> {
  /**
   * Function to check if there is a token in the contract tokens.
   * @param  tokens - List contract tokens.
   * @param  token - Token from request.
   * @returns {Promise<boolean>} Find token or not.
   */
  for (let index = 0; index < tokens.length; index++) {
    if (token === tokens[index]) {
      return true;
    }
  }

  return false;
}

export async function getPriceGas(): Promise<string> {
  return await web3.eth.getGasPrice();
}

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
