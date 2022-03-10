const {
  buildSchema,
  GraphQLID,
  GraphQLFloat,
  isNullableType,
  GraphQLInt,
} = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
} = require("graphql");

////////////// Root Queries ///////////////////////

////////////// Queries Types  ///////////////////////
// type User{
//   _id: ID!
//   email: String!
//   password: String
//   createdEvents: [Event!]
// }
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => {
    _id: {
      type: GraphQLID;
      isNullableType: false;
    }
    email: {
      type: GraphQLString;
      isNullableType: false;
    }
    password: {
      type: GraphQLString;
      isNullableType: false;
    }
    createdEvents: {
      type: GraphQLList({ type: EventType, isNullableType: false });
      isNullableType: false;
    }
  },
});

// type Event {
//     _id: ID!
//     title: String!
//     description: String!
//     price: Float!
//     date: String!
//     creator: User!
// }

const EventType = new GraphQLObjectType({
  name: "Event",
  fields: () => {
    _id: {
      type: GraphQLID;
      isNullableType: false;
    }
    title: {
      type: GraphQLString;
      isNullableType: false;
    }
    description: {
      type: GraphQLString;
      isNullableType: false;
    }
    price: {
      type: GraphQLFloat;
      isNullableType: false;
    }
    date: {
      type: GraphQLString;
      isNullableType: false;
    }
    creator: {
      type: UserType;
      isNullableType: false;
    }
  },
});

// type AuthData{
//     userId: ID!
//     token: String!
//     tokenExpiration: Int!
// }

const AuthType = new GraphQLObjectType({
  name: "Auth",
  fields: () => {
    userId: {
      type: GraphQLID;
      isNullableType: false;
    }
    token: {
      type: GraphQLString;
      isNullableType: false;
    }
    tokenExpiration: {
      type: GraphQLInt;
      isNullableType: false;
    }
  },
});

// type Booking{
//     _id: ID!
//     event: Event!
//     user: User!
//     createdAt: String!
//     updatedAt: String!
// }

const BookingType = new GraphQLObjectType({
  name: "Booking",
  fields: () => {
    _id: {
      type: GraphQLID;
      isNullableType: false;
    }
    event: {
      type: EventType;
      isNullableType: false;
    }
    user: {
      type: UserType;
      isNullableType: false;
    }
    createdAt: {
      type: GraphQLString;
      isNullableType: false;
    }
    updatedAt: {
      type: GraphQLString;
      isNullableType: false;
    }
  },
});

////////////// Queries Types  ///////////////////////

// type RootQuery {
//     events: [Event!]!
//     bookings: [Booking!]!
//     login(email: String!, password: String!): AuthData!
// }
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    events: {
      type: new GraphQLList({ type: UserType, isNullableType: false }),
      isNullableType: false,
    },
  },
});

////////////// Root Queries ///////////////////////

const RootMutation = "mutation";

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

module.exports = schema;

// module.exports = buildSchema(`
// type Event {
//     _id: ID!
//     title: String!
//     description: String!
//     price: Float!
//     date: String!
//     creator: User!
// }

// type User{
//   _id: ID!
//   email: String!
//   password: String
//   createdEvents: [Event!]
// }

// type AuthData{
//     userId: ID!
//     token: String!
//     tokenExpiration: Int!
// }

// type Booking{
//     _id: ID!
//     event: Event!
//     user: User!
//     createdAt: String!
//     updatedAt: String!
// }

// input EventInput{
//     title: String!
//     description: String!
//     price: Float!
//     date: String!
// }

// input UserInput{
//   email: String!
//   password: String!
// }

// type RootQuery {
//     events: [Event!]!
//     bookings: [Booking!]!
//     login(email: String!, password: String!): AuthData!
// }

// type RootMutation{
//     createEvent(eventInput: EventInput): Event
//     createUser(userInput: UserInput): User
//     bookEvent(eventId: ID!): Booking!
//     cancelBooking(bookingId: ID!): Event!
// }
// schema {
//     query: RootQuery
//     mutation: RootMutation
// }`);
