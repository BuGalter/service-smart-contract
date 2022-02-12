import { Sequelize, } from 'sequelize-typescript';
import config from '../config/config';
import { Acount, } from './Acount';
import { Wallet, } from './Wallet';
import { Transaction } from './Transaction';

const sequelize = new Sequelize(config.db.dbName, config.db.userName, config.db.password, {
  host: config.db.dbHost,
  dialect: 'postgres',
  models: [Acount, Wallet, Transaction],
  logging: false,
});

export default sequelize;
