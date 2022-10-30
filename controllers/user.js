const { v4: uuidv4 } = require("uuid");
const userDb = require("../models/user");

const createUser = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty" });
  }

  const user = new userDb({
    id: uuidv4(),
    userName: req.body.name,
    amount: 0,
  });

  await user
    .save(user)
    .then((data) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      });
    });
};

const getUserById = async (req, res) => {
  try {
    const user = await userDb.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.send("Error " + error);
  }
};

const getUsers = async (req, res) => {
  try {
    const user = await userDb.find();
    res.json(user);
  } catch (error) {
    res.send("Error " + error);
  }
};

module.exports = {
  createUser,
  getUserById,
  getUsers,
};
