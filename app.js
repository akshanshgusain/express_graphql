const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const Event = require("./models/events");
const User = require("./models/user");
const bcrypt = require("bcryptjs");

const app = express();

app.use(bodyParser.json());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    type User{
      _id: ID!
      email: String!
      password: String
    }

    input EventInput{
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    input UserInput{
      email: String!
      password: String!
    }

    type RootQuery {
        events: [Event!]!
    }


    type RootMutation{
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput): User
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }`),
    rootValue: {
      events: () => {
        return Event.find()
          .then((result) => {
            return result.map((event) => {
              return { ...event._doc, _id: event._doc._id.toString() };
            });
          })
          .catch((err) => {
            throw err;
          });
      },
      createEvent: (args) => {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date),
        });
        return event
          .save()
          .then((result) => {
            console.log(result);
            return { ...result._doc };
          })
          .catch((err) => {
            console.log(err);
            throw err;
          });
        return event;
      },
      createUser: (args) => {
        return bcrypt
          .hash(args.userInput.password, 12)
          .then((hashedPassword) => {
            const newUser = new User({
              email: args.userInput.email,
              password: hashedPassword,
            });

            return newUser
              .save()
              .then((result) => {
                console.log(result);
                return { ...result._doc };
              })
              .catch((err) => {
                console.log(err);
                throw err;
              });
          });

        return newUser;
      },
    },
    graphiql: true,
  })
);

app.get("/", (req, res, next) => {
  res.send("Hey There!");
});

// Connection to MongoDB Database
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@clustergraphql.okwmj.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000, () => {
      console.log(`listening to port 3000!`);
    });
  })
  .catch((err) => {
    console.log("Failed to start the server! Could not connect to MongoDB");
    console.log(err);
  });
