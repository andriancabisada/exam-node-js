const depositDb = require("../models/deposit");

const deposit = async (req, res) => {
  try {
    const deposit = await depositDb.findById(req.body.userId);
    deposit.amount += req.body.amount;

    try {
      deposit = await depositDb.findOneAndUpdate(
        { userId: req.params.id },
        deposit,
        {
          new: true,
          runValidators: true,
        }
      );
      res.json(deposit);
    } catch (error) {
      res.send("Error " + error);
    }
  } catch (error) {
    res.send("Error " + error);
  }
};

module.exports = {
  deposit,
};

// story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
//     new: true,
//     runValidators: true,
//   })
