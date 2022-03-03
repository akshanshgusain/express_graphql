const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");

const graphQlSchema = require("./graphql/schema/index");
const graphQlResolver = require("./graphql/resolvers/index");

// const { create } = require("./models/events");

const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolver,
    graphiql: true,
  })
);

app.get("/", (req, res, next) => {
  res.send("Hey There!");
});

// Connection to MongoDB Database
const dbConnect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@clustergraphql.okwmj.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
    );

    app.listen(3000, () => {
      console.log(`listening to port 3000!`);
    });
  } catch (err) {
    console.log("Failed to start the server! Could not connect to MongoDB");
    console.log(err);
  }
};

dbConnect();
