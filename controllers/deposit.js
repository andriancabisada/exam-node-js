const depositDb = require("../models/deposit");
const userDb = require("../models/user");
const { v4: uuidv4 } = require("uuid");

const deposit = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty" });
  }

  const checkAccountExists = async (id) => {
    const user = await userDb.findById(id);
    if (!user) return false;
    return true;
  };

  const updateAccount = async (id, amount) => {
    const user = await userDb.findOne({ _id: id });
    user.accountBalance += amount;
    await user.save();
    return user;
  };

  if (checkAccountExists(req.body.id)) {
    const dep = new depositDb({
      id: uuidv4(),
      amount: req.body.amount,
      userId: req.body.id,
    });

    try {
      await dep.save();
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

const getDeposits = async (req, res) => {
  try {
    const deposits = await depositDb.find();
    res.json(deposits);
  } catch (error) {
    res.send("error " + error);
  }
};

module.exports = {
  deposit,
  getDeposits,
};
