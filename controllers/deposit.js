const depositDb = require("../models/deposit");

const deposit = async (req, res) => {
  try {
    const deposit = await depositDb.find(req.body.userId);
    deposit.amount = req.body.amount;

    await deposit
      .save(deposit)
      .then((data) => {
        res.json(deposit);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while deposit",
        });
      });
  } catch (error) {
    res.send("Error " + error);
  }
};

module.exports = {
  deposit,
};
