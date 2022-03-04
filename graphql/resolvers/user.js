const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const res = require("express/lib/response");
const { dateToString } = require("../../helper/date");
const jwt = require("jsonwebtoken");

//     Module Export
module.exports = {
  createUser: async (args) => {
    try {
      const user = await User.findOne({ email: args.userInput.email });

      if (user) {
        throw new Error("User exists already.");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const newUser = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });

      const result = await newUser.save();
      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        throw new Error("User does not exist");
      }

      const isEqual = await bcrypt.compare(password, user.password);

      if (!isEqual) {
        console.log("Incorrect Password");
        throw new Error("Incorrect password!");
      }

      // generate jwt
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        `${process.env.SECRET_KEY}`
      );

      return {
        userId: user.id,
        token: token,
        tokenExpiration: 1,
      };
    } catch (err) {}
  },
};
