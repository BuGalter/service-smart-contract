import Web3 from 'web3';
import config from '../config/config'; 

const provider = new Web3.providers.WebsocketProvider(config.provider.link);
export const web3 = new Web3(provider);