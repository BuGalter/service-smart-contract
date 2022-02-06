import { start, } from './server/index';

try {
  start();
}
catch (e) {
  console.error(e);
}
