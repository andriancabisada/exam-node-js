const withdrawDb = require("../models/withdraw");
const userDb = require("../models/user");

const withDraw = async (req, res) => {
  if (
    checkAccountExists(req.body.id) &&
    checkValidWithDrawAmount(req.body.amount, req.body.id)
  ) {
    const withdraw = new withdrawDb({
      id: uuidv4(),
      amount: req.body.name,
      userId: req.body.id,
    });

    await withdraw
      .save(withdraw)
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

async function checkValidWithDrawAmount(id, amount) {
  const user = await userDb.findById(id);
  if (!user) return false;

  if (amount > user.amount) return false;
  return true;
}

async function updateAccount(id, amount) {
  const user = await userDb.findById(id);
  userDb.findOne({ _id: id }, function (err, user) {
    if (!err) {
      if (!user) {
        user = new userDb();
        user.amount -= amount;
      }

      user.save(function (err) {
        if (!err) res.json(user);
        else res.send("Error " + err);
      });
    }
  });
}

module.exports = {
  withDraw,
};

// withdraw.amount -= req.body.amount;
// try {
//   withdraw = await withdrawDb.findOneAndUpdate(
//     { userId: req.params.id },
//     withdraw,
//     {
//       new: true,
//       runValidators: true,
//     }
//   );
//   res.json(withdraw);
// } catch (error) {
//   res.send("Error " + error);
// }
/*

ContactSchema.findOne({phone: request.phone}, function(err, contact) {
    if(!err) {
        if(!contact) {
            contact = new ContactSchema();
            contact.phone = request.phone;
        }
        contact.status = request.status;
        contact.save(function(err) {
            if(!err) {
                console.log("contact " + contact.phone + " created at " + contact.createdAt + " updated at " + contact.updatedAt);
            }
            else {
                console.log("Error: could not save contact " + contact.phone);
            }
        });
    }
});

*/
