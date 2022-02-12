import BigNumber from "bignumber.js";

export async function createInDb(model, options) {
  try {
    await model.create(options);
  } catch (err) {
    console.log(err);
  }
};

export async function incremetWallet(wallet, amount) {
  let balans = new BigNumber(wallet.balans);
  let delta = new BigNumber(amount);
  let newBalans =  balans.plus(delta);
  try {
    await wallet.update({
      balans: newBalans.toString(),
    });  
  } catch (err) {
    console.log(err)    
  }
};

export async function decrementWallet(wallet, amount) {
  let balans = new BigNumber(wallet.balans);
  let delta = new BigNumber(amount);
  let newBalans = balans.minus(delta);
  try {
    await wallet.update({
      balans: newBalans.toString(),     
    });
  } catch (err) {
    console.log(err);
  }
};

export async function findByPkDb(model, primaryKey) {
  try {
    let data = await model.findByPk(primaryKey);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export async function findOneDb(model, options) {
  try {
    let data = await model.findOne({ where: options, });
    return data;
  } catch (err) {
    console.log(err);
  }
};
