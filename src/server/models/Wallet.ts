import {
  Column, Model, Table, ForeignKey, BelongsTo, DataType
} from 'sequelize-typescript';
import { getUUID, } from '../utils';
import { Acount, } from './Acount';

@Table
export class Wallet extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING,
    defaultValue: () => getUUID(),
  })
  id: string;

  @Column(DataType.STRING)
  tokenAddress: string;

  @ForeignKey(() => Acount)
  @Column(DataType.STRING)
  acountAddress: string;

  @Column(DataType.STRING)
  balans: string;

  @BelongsTo(() => Acount)
  acount: Acount;
}