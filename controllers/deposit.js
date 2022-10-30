const depositDb = require("../models/deposit");
const userDb = require("../models/user");

const deposit = async (req, res) => {
  if (checkAccountExists(req.body.id)) {
    const deposit = new depositDb({
      id: uuidv4(),
      amount: req.body.name,
      userId: req.body.id,
    });

    await deposit
      .save(deposit)
      .then((data) => {
        updateAccount(id, req.body.amount);
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
  const user = await userDb.findById(id);
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
