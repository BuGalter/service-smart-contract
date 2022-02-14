import { web3, } from "../web3";
import { AbiItem, } from "web3-utils";
import tokenAbi from '../token/token-abi.json';
import { contract, } from "../contract";
import { output, error,  } from "../utils";
import { getPriceGas, } from "../utils/contract";

export async function getTokenList(): Promise<string[]> {
  /**
   * Function to get list contract tokens.
   * @returns {string[]} Array of tokens.
   */

  try {
    const gasPrice: string = await getPriceGas();
    const gasEstimate: number = await contract.methods.getListTokens().estimateGas();;
    const options: { gasPrice: string, gas: number, } = {
      gasPrice: gasPrice,
      gas: gasEstimate
    };
    const tokens: string[] = await contract.methods.getListTokens().call(options);
    return  tokens;
  } catch (err) {
    console.log(err);
  }
}

export async function getTokens(r) {
  /**
   * Handler for route tokens/.
   * @param  {request} r - Request object.
   */

  const tokens: string[] = await getTokenList();
  if (!tokens) {
    return error(404000, 'Tokens not found!', null)  ;
  }
  return output({ Tokens: tokens, });
}

export async function getTokenInfo(r) {
  /**
   * Function to get info about token. Handler for route tokens/{tokenAddress}.
   * @param  {request} r - Request object.
   */
  const tokenAddress: string = r.params.tokenAddress;
  try {
    const tokenContract: any = new web3.eth.Contract(tokenAbi as AbiItem[], tokenAddress);
    const name: string = await tokenContract.methods.name().call();
    const symbol: string = await tokenContract.methods.symbol().call();
    const decimals: number = await tokenContract.methods.decimals().call();
    return output({ name, symbol, decimals, });
  } catch (err) {
    console.log(err);
    return error(400000, 'Incorrect data!', null);
  }
}
