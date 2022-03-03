const userResolver = require("./user");
const eventResolver = require("./events");
const bookingResolver = require("./booking");

const rootResolver = {
  ...userResolver,
  ...eventResolver,
  ...bookingResolver,
};

module.exports = rootResolver;
