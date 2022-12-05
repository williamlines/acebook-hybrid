const User = require("../models/user");

const UsersController = {
  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        res.status(400).json({ message: "Bad request" });
      } else {
        res.status(201).json({ message: "OK" });
      }
    });
  },
  UpdateUser: (req, res) => {
    console.log("hello here");
    console.log(req.body.fullname);
    req.body.UserId = req.user_id;
    User.findByIdAndUpdate(
      req.user_id,
      {
        $push: {
          fullname: req.body.fullname,
        },
      },
      async (err) => {
        if (err) {
          throw err;
        }
        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(201).json({ message: OK, token: token });
      }
    );
  },
};

module.exports = UsersController;
