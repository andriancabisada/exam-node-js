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

    try {
      await wd.save();
      const usr = await updateAccount(req.body.id, req.body.amount);
      res.json(usr);
    } catch (err) {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      });
    }
  }
};

async function checkAccountExists(id) {
  const user = await userDb.findById(id);
  if (!user) return false;
  return true;
}

async function checkValidWithDrawAmount(id, amount) {
  const user = await userDb.findById(id);

  if (!user) return false;
  if (amount > user.amount) return false;
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
