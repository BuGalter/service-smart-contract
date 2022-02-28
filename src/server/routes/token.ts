import { getTokens, getTokenInfo, } from "../api/token"

export default [
  {
    method: 'GET',
    path: '/tokens',
    handler: getTokens,
  },
  {
    method: 'GET',
    path: '/tokens/{tokenAddress}',
    handler: getTokenInfo,
  }
]