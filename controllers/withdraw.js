const withdrawDb = require("../models/withdraw");

const withDraw = async (req, res) => {
  try {
    const withdraw = await withdrawDb.findById(req.body.userId);

    if (req.body.amount > withdraw.amount) res.send("Withdraw amount invalid");

    withdraw.amount -= req.body.amount;
    try {
      withdraw = await withdrawDb.findOneAndUpdate(
        { userId: req.params.id },
        withdraw,
        {
          new: true,
          runValidators: true,
        }
      );
      res.json(withdraw);
    } catch (error) {
      res.send("Error " + error);
    }
  } catch (error) {
    res.send("Error " + error);
  }
};

module.exports = {
  withDraw,
};
