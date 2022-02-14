import { web3, } from "../web3";
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
  let options: {fromBlock: number | string, toBlock: number | string, address: string, } = {
    fromBlock:  0, 
    toBlock: 'latest',
    address: r.params.tokenAddress
  };
  try {
    let logs: Array<object> = await web3.eth.getPastLogs(options);
    if (logs.length === 0) {
      return output({ message: 'Data not found!', });
    }
    return output({ Logs: logs, });  
  } catch (err) {
    console.log(err);
    return error(400000, 'Incorrect data!', null);
  }
}