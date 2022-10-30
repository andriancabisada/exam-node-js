const depositDb = require("../models/deposit");
const userDb = require("../models/user");
const { v4: uuidv4 } = require("uuid");

const deposit = async (req, res) => {
  if (checkAccountExists(req.body._id)) {
    const deposit = new depositDb({
      id: uuidv4(),
      amount: req.body.amount,
      userId: req.body._id,
    });

    await deposit
      .save(deposit)
      .then((data) => {
        updateAccount(req.body._id, req.body.amount);
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

async function checkAccountExists(id) {
  const user = await userDb.findById(id);
  if (!user) return false;
  return true;
}

async function updateAccount(id, amount) {
  //const user = await userDb.findById(id);
  userDb.findOne({ _id: id }, function (err, user) {
    if (!err) {
      if (!user) {
        user = new userDb();
        user.amount += amount;
      }

      user.save(function (err) {
        if (!err) res.json(user);
        else res.send("Error " + err);
      });
    }
  });
}

module.exports = {
  deposit,
};
