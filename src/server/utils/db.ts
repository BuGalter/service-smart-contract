import BigNumber from "bignumber.js";

export async function createInDb(model: any, options: any): Promise<void> {
  /**
   * Function to create in db.
   * @param  {any} model - Name model for create in db.
   * @param  {any} options - Model options for create in db.
   */
  try {
    await model.create(options);
  } catch (err) {
    console.log(err);
  }
};

export async function incremetWallet(wallet: any, amount: string): Promise<void> {
  /**
   * Function to increment balans wallet.
   * @param  {any} wallet - Wallet user from db.
   * @param  {string} amount - Sum transaction.
   */
  let balans: BigNumber = new BigNumber(wallet.balans);
  let delta: BigNumber = new BigNumber(amount);
  let newBalans: BigNumber =  balans.plus(delta);
  try {
    await wallet.update({
      balans: newBalans.toString(),
    });  
  } catch (err) {
    console.log(err)    
  }
};

export async function decrementWallet(wallet: any, amount: string): Promise<void> {
  /**
   * Function decrement balans wallet.
   * @param  {any} wallet - Wallet user from db.
   * @param  {string} amount - Sum transaction.
   */
  let balans: BigNumber = new BigNumber(wallet.balans);
  let delta: BigNumber = new BigNumber(amount);
  let newBalans: BigNumber = balans.minus(delta);
  try {
    await wallet.update({
      balans: newBalans.toString(),     
    });
  } catch (err) {
    console.log(err);
  }
};

export async function findByPkDb(model: any, primaryKey: string): Promise<any> {
  /**
   * Function to find by primary key in db.
   * @param  {any} model - Name model for find in db.
   * @param  {any} primaryKey - Primary key for find in db.
   */
  try {
    let data: any = await model.findByPk(primaryKey);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export async function findOneDb(model: any, options: any): Promise<any> {
  /**
   * Function to find one in db.
   * @param  {any} model - Name model for find in db.
   * @param  {any} options - Options for search in db.
   */
  try {
    let data: any = await model.findOne({ where: options, });
    return data;
  } catch (err) {
    console.log(err);
  }
};
