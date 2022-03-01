const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const app = express();

app.use(bodyParser.json());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
    type RootQuery {
        events: [String!]!
    }
    type RootMutation{
        createEvent(name: String): String
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }`),
    rootValue: {
      events: () => {
        return ["Event1", "Event2", "Event3"];
      },
      createEvent: (args) => {
        const eventName = args.name;
        return eventName;
      },
    },
    graphiql: true,
  })
);

app.get("/", (req, res, next) => {
  res.send("Hey There!");
});

app.listen(3000, () => {
  console.log(`listening to port 3000!`);
});
