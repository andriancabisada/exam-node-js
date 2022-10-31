const depositDb = require("../models/deposit");
const userDb = require("../models/user");
const { v4: uuidv4 } = require("uuid");

const deposit = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty" });
  }

  if (checkAccountExists(req.body.id)) {
    const deposit = new depositDb({
      id: uuidv4(),
      amount: req.body.amount,
      userId: req.body.id,
    });

    await deposit
      .save(deposit)
      .then((data) => {
        res.json(console.log(updateAccount(req.body.id, req.body.amount)));
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while creating a create operation",
        });
      });
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
async function checkAccountExists(id) {
  const user = await userDb.findById(id);
  if (!user) return false;
  return true;
}

async function updateAccount(id, amount) {
  const user = await userDb.findOne({ _id: id });
  user.accountBalance += amount;
  await user.save();
  return user;
}

module.exports = {
  deposit,
  getDeposits,
};
