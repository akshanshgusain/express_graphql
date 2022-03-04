const { dateToString } = require("../../helper/date");
const Event = require("../../models/events");
const User = require("../../models/user");
const { user, transformEvent } = require("../resolvers/merge");

// Helper functions

// Helper functions
module.exports = {
  events: async () => {
    try {
      const eventsFound = await Event.find();
      return eventsFound.map((event) => {
        return transformEvent(event);
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async (args, req) => {
    if (!req.isAuth) {
      console.log("UnAuthentocated");
      throw new Error("UnAuthentocated");
    }
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

      createEvent = transformEvent(result);

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
};
