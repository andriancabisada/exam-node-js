const withdrawDb = require("../models/withdraw");

const withDraw = async (req, res) => {
  try {
    const withdraw = await withdrawDb.findById(req.body.userId);

    if (req.body.amount > withdraw.amount)
      return res.send("Withdraw amount invalid");

    withDraw.amount -= req.body.amount;

    await withdraw
      .update(withdraw)
      .then((data) => {
        res.json(withdraw);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while withdrawing",
        });
      });
  } catch (error) {
    res.send("Error " + error);
  }
};

module.exports = {
  withDraw,
};
