const depositDb = require("../models/deposit");

const deposit = async (req, res) => {
  try {
    const deposit = await depositDb.findById(req.body.id);
    deposit.amount += req.body.amount;

    try {
      deposit = await depositDb.findOneAndUpdate(
        { amount: deposit.amount },
        deposit,
        {
          runValidators: true,
        }
      );
      res.json(deposit);
    } catch (error) {
      res.send("Error " + error);
    }
  } catch (error) {
    res.send("Error " + error);
  }
};

const getDeposit = async (req, res) => {
  try {
    const deposit = await depositDb.findById(req.params.id);
    res.json(deposit);
  } catch (error) {
    res.send("Error " + error);
  }
};

module.exports = {
  deposit,
  getDeposit,
};
