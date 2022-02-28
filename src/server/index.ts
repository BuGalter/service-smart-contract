import * as Hapi from '@hapi/hapi';
import config from './config/config';
import sequelize from './models';
import { contract, handlingEventsDeposit, handlingEventsWithdraw, } from './contract';
import { handleDepositEvent, handleWithdrawEvent, } from './utils/contract';

const createServer = async (): Promise<any> => {
  /**
   * A constant that contains server settings
   * @returns  {Promise<any>} Server on hapi lib.
   */
  const server: { port: string, host: string, } = Hapi.server({
    port: config.server.port,
    host: config.server.host,
  });

  try {
    await sequelize.sync();
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  }
  catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  const eventsDeposit: Array<any> = await contract.getPastEvents('Deposit', { fromBlock: 0, toBlock: 'latest' });
  const resultDeposit: string = await handlingEventsDeposit(eventsDeposit);
  console.log(resultDeposit);

  const depositSubscribe: any = await contract.events.Deposit({
    fromBlock: 'latest',
    }, 
    async (err, event) => {
      if (!err) {
        console.log('Event')
        let result = await handleDepositEvent(event);
        console.log(result);
      } else {
        console.log(err);
      }
  });
  
  depositSubscribe.on('connected', (subscriptionId) => {
    console.log(`Subscription event deposit connected, id: ${subscriptionId}`);
  });

  const eventsWithdraw: Array<any> = await contract.getPastEvents('Withdraw', { fromBlock: 0, toBlock: 'latest' });
  const resultWithdraw: string = await handlingEventsWithdraw(eventsWithdraw);
  console.log(resultWithdraw);
  
  const withdrawSubscribe: any = await contract.events.Withdraw({
    fromBlock: 'latest',
    }, 
    async (err, event) => {
      if (!err) {
        console.log('Event')
        let result = await handleWithdrawEvent(event);
        console.log(result);
      } else {
        console.log(err);
      }
  });

  withdrawSubscribe.on('connected', (subscriptionId) => {
    console.log(`Subscription event withdraw connected, id: ${subscriptionId}`);
  });

  return server;
};

const start = async () => {
  const server: any = await createServer();
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
  return server;
};

export { start, };
