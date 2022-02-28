import {
  Column, Model, Table, ForeignKey, BelongsTo, DataType
} from 'sequelize-typescript';

@Table
export class Transaction extends Model {
  @Column({ primaryKey: true, type: DataType.STRING})
  transactionHash: string;

  @Column(DataType.STRING)
  acountAddress: string;

  @Column(DataType.STRING)
  addressToken: string;

  @Column(DataType.STRING)
  amount: string;
}