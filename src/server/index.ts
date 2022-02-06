import * as Hapi from '@hapi/hapi';
import config from './config/config';

const createServer = async () => {
  const server = Hapi.server({
    port: config.server.port,
    host: config.server.host,
  });

  return server;
};

const init = async () => {
  const server = await createServer();
  await server.initialize();
  return server;
};

const start = async () => {
  const server = await createServer();
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
  return server;
};

export { init, start, };
