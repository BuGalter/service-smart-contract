import { web3, } from '../web3';
import { AbiItem, } from "web3-utils";
import { contract, } from '../contract';
import { error, output } from '../utils';
import { getPriceGas, getAccount, isTokenInList, } from '../utils/contract';
import tokenAbi from '../token/token-abi.json';
import { getTokenList, } from './token';

export async function contractApprove(r) {
  /**
   * Handler for route contract/approve.
   * @param  {request} r - Request object.
   */
  const { tokenAddress, amount, userPrivateKey, } = r.payload;
  const tokens:string[] = await getTokenList();
  if (!tokens) {
    return error(404000, 'Tokens not found!', null);
  }

  const accountAddress: string = await getAccount(userPrivateKey);
  if (!accountAddress) {
    return error(404000, 'Account not fount!', null);
  }

  if (isTokenInList(tokens, tokenAddress)) {
    try {
      const tokenContract = new web3.eth.Contract(tokenAbi as AbiItem[], tokenAddress);
      const gasPrice: string = await getPriceGas();
      const gasEstimate: number = await tokenContract.methods.approve(tokenAddress, amount)
      .estimateGas({from: accountAddress});
  
      const result = await tokenContract.methods.approve(tokenAddress, amount).send({
        from: accountAddress,
        gasPrice: gasPrice,
        gas: gasEstimate
      });

      return output({ transactionHash: result.transactionHash, });
    } catch (err) {
      console.log(err);
      return error(400000, 'Invalid data!', null);
    }
  }
  
  return error(404000, 'Token address dont find in contract!', null);
}

export async function contractDeposit(r) {
  /**
   * Handler for route contract/deposit.
   * @param  {request} r - Request object.
   */
  const { tokenAddress, amount, userPrivateKey, } = r.payload;
  const tokens: string[] = await getTokenList();
  if (!tokens) {
    return error(404000, 'Tokens not found!', null);
  }

  const accountAddress: string = await getAccount(userPrivateKey);
  if (!accountAddress) {
    return error(404000, 'Account not fount!', null);
  }

  if (isTokenInList(tokens, tokenAddress)) {
    try {
      const gasPrice: string = await getPriceGas();
      const gasEstimate: number = await contract.methods.deposit(amount, tokenAddress)
      .estimateGas({from: accountAddress});
  
      const result = await contract.methods.deposit(amount,tokenAddress)
      .send({
        from: accountAddress,
        gasPrice: gasPrice,
        gas: gasEstimate
      });

      return output({ transactionHash: result.transactionHash, });
    } catch (err) {
      console.log(err);
      return error(400000, 'Invalid data!', null);
    }
  }
  
  return error(404000, 'Token address dont find in contract!', null);
}

export async function contractWithdraw(r) {
  /**
   * Handler for route contract/withdraw.
   * @param  {request} r - Request object.
   */
  const { tokenAddress, amount, userPrivateKey, } = r.payload;
  const tokens = await getTokenList();
  if (!tokens) {
    return error(404000, 'Tokens not found!', null);
  }

  const accountAddress: string = await getAccount(userPrivateKey);
  if (!accountAddress) {
    return error(404000, 'Account not fount!', null);
  }

  if (isTokenInList(tokens, tokenAddress)) {
    try {
      const gasPrice: string = await getPriceGas();
      const gasEstimate: number = await contract.methods.withdraw(amount, tokenAddress)
      .estimateGas({from: accountAddress});
  
      const result = await contract.methods.withdraw(amount,tokenAddress)
      .send({
        from: accountAddress,
        gasPrice: gasPrice,
        gas: gasEstimate
      });

      return output({ transactionHash: result.transactionHash, });
    } catch (err) {
      console.log(err);
      return error(400000, 'Invalid data!', null);
    }
  }
  
  return error(404000, 'Token address dont find in contract!', null);
}