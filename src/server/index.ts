import * as Hapi from '@hapi/hapi';
import * as Inert from '@hapi/inert';
import config from './config/config';
import sequelize from './models';
import routes from './routes';
import { contract, handlingEventsDeposit, handlingEventsWithdraw, } from './contract';
import { handleDepositEvent, handleWithdrawEvent, } from './utils/contract';

const createServer = async () => {
  const server = Hapi.server({
    port: config.server.port,
    host: config.server.host,
  });

  await server.register([Inert]);
  server.realm.modifiers.route.prefix = '/api';
  server.route(routes);

  try {
    await sequelize.sync();
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  }
  catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  const eventsDeposit = await contract.getPastEvents('Deposit', { fromBlock: 0, toBlock: 'latest' });
  const resultDeposit = await handlingEventsDeposit(eventsDeposit);
  console.log(resultDeposit);

  const depositSubscribe = await contract.events.Deposit({
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

  const eventsWithdraw = await contract.getPastEvents('Withdraw', { fromBlock: 0, toBlock: 'latest' });
  const resultWithdraw = await handlingEventsWithdraw(eventsWithdraw);
  console.log(resultWithdraw);
  
  const withdrawSubscribe = await contract.events.Withdraw({
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
  const server = await createServer();
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
  return server;
};

export { start, };
