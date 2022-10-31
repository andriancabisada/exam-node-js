const withdrawDb = require("../models/withdraw");
const userDb = require("../models/user");
const { v4: uuidv4 } = require("uuid");

const withDraw = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty" });
  }

  if (
    checkAccountExists(req.body.id) &&
    checkValidWithDrawAmount(req.body.id, req.body.amount)
  ) {
    const wd = new withdrawDb({
      id: uuidv4(),
      amount: req.body.amount,
      userId: req.body.id,
    });

    await wd
      .save(wd)
      .then((data) => {
        res.json(updateAccount(req.body.id, req.body.amount));
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while creating a create operation",
        });
      });
  } else {
    res.status(500).send({
      message: "Account doesn't exist or Withdraw amount is not valid",
    });
  }
};

async function checkAccountExists(id) {
  const user = await userDb.findById(id);
  if (!user) return false;
  return true;
}

async function checkValidWithDrawAmount(id, amount) {
  const user = await userDb.findById(id);
  if (amount > user.amount) return false;
  if (!user) return false;

  return true;
}

async function updateAccount(id, amount) {
  const user = await userDb.findOne({ _id: id });
  user.accountBalance -= amount;
  await user.save();
  return user;
}

module.exports = {
  withDraw,
};
