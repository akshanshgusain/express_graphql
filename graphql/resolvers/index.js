const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Event = require("../../models/events");
const User = require("../../models/user");

const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => {
      return {
        ...event._doc,
        _id: event.id,
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, event.creator),
      };
    });
  } catch (err) {
    throw err;
  }
};

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: events.bind(this, user._doc.createdEvents),
    };
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  events: async () => {
    try {
      const eventsFound = await Event.find();
      return eventsFound.map((event) => {
        return {
          ...event._doc,
          _id: event._doc._id.toString(),
          date: new Date(event._doc.date).toISOString(),
          creator: user.bind(this, event._doc.creator),
        };
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async (args) => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: "62208d3f4e097c5b6bfafcbb",
    });
    let createEvent;
    try {
      const result = await event.save();

      createEvent = {
        ...result._doc,
        _id: result._doc._id.toString(),
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, result._doc.creator),
      };

      const userFound = await User.findById("62208d3f4e097c5b6bfafcbb");

      if (!userFound) {
        throw new Error("User does not exist.");
      }
      userFound.createdEvents.push(event);
      await userFound.save();

      return createEvent;
    } catch (err) {
      console.log(result);
      throw err;
    }
  },
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
};
