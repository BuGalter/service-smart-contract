import {
  Column, HasMany, Model, Table, DataType,
} from 'sequelize-typescript';
import { Wallet, } from './Wallet';

@Table
export class Acount extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING,
  })
  address: string;

  @HasMany(() => Wallet)
  wallet: Wallet[];
}