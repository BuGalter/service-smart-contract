import { contract, } from "../contract";
import { output, error,  } from "../utils";
import { getPriceGas, } from "../utils/contract";

export async function getTokenList() {
  try {
    const gasPrice = await getPriceGas();
    const gasEstimate = await contract.methods.getListTokens().estimateGas();;
    const options = {
      gasPrice: gasPrice,
      gas: gasEstimate
    };
    const tokens = await contract.methods.getListTokens().call(options);
    return  tokens;
  } catch (err) {
    console.log(err);
  }
}

export async function getTokens(r) {
  const tokens = await getTokenList();
  if (!tokens) {
    return error(404000, 'Tokens not found!', null)  ;
  }
  return output({ Tokens: tokens, });
}

export async function getTokenInfo(r) {
  
}