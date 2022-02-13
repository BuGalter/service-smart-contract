import { schemaPayload, } from "../shemes";
import { contractApprove, contractDeposit, contractWithdraw, } from "../api/contract";

export default [
  {
    method: 'POST',
    path: '/contract/approve',
      options: {
      validate: {
        payload: schemaPayload,
      },
    },
    handler: contractApprove,
  },
  {
    method: 'POST',
    path: '/contract/deposit',
    options: {
      validate: {
        payload: schemaPayload,
      },
    },
    handler: contractDeposit,
  },
  {
    method: 'POST',
    path: '/contract/withdraw',
    options: {
      validate: {
        payload: schemaPayload,
      },
    },
    handler: contractWithdraw,
  }
]