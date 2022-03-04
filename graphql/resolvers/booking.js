// const { dateToString } = require("../../helper/date");
const Booking = require("../../models/booking");
const Event = require("../../models/events");
// const { user, singleEvent } = require("../resolvers/merge");

// ////----  Helper Functions  ----------

// const transformBooking = (booking) => {
//   return {
//     ...booking._doc,
//     _id: booking.id,
//     user: user.bind(this, booking._doc.user),
//     event: singleEvent.bind(this, booking._doc.event),
//     createdAt: dateToString(booking._doc.createdAt),
//     updatedAt: dateToString(booking._doc.updatedAt),
//   };
// };

// ////----  Helper Functions End ----------

// //     Module Export
// module.exports = {
//   bookings: async (req) => {
//     if (!req.isAuth) {
//       console.log("UnAuthentocated");
//       throw new Error("UnAuthentocated");
//     }
//     try {
//       const bookings = await Booking.find();
//       return bookings.map((booking) => {
//         return transformBooking(booking);
//       });
//     } catch (err) {
//       throw err;
//     }
//   },
//   bookEvent: async (args, req) => {
//     if (!req.isAuth) {
//       console.log("UnAuthentocated");
//       throw new Error("UnAuthentocated");
//     }

//     try {
//       const fetchedEvent = await Event.findOne({ _id: args.eventId });
//       const booking = new Booking({
//         user: "62208d3f4e097c5b6bfafcbb",
//         event: fetchedEvent,
//       });

//       const result = await booking.save();
//       return transformBooking(booking);
//     } catch (err) {
//       throw err;
//     }
//   },
//   cancelBooking: async (args, req) => {
//     if (!req.isAuth) {
//       console.log("UnAuthentocated");
//       throw new Error("UnAuthentocated");
//     }
//     try {
//       const booking = await Booking.findById(args.bookingId).populate("event");
//       const evenT = transformEvent(booking.event);
//       await Booking.deleteOne({ _id: args.bookingId });
//       return evenT;
//     } catch (err) {
//       throw err;
//     }
//   },
// };

const { transformBooking, transformEvent } = require("./merge");

module.exports = {
  bookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const bookings = await Booking.find();
      return bookings.map((booking) => {
        return transformBooking(booking);
      });
    } catch (err) {
      throw err;
    }
  },
  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    const fetchedEvent = await Event.findOne({ _id: args.eventId });
    const booking = new Booking({
      user: req.userId,
      event: fetchedEvent,
    });
    const result = await booking.save();
    return transformBooking(result);
  },
  cancelBooking: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const booking = await Booking.findById(args.bookingId).populate("event");
      const event = transformEvent(booking.event);
      await Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (err) {
      throw err;
    }
  },
};
