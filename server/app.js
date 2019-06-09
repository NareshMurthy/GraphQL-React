const express = require("express");
const schema = require("./schema/schema");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(cors());

mongoose.connect(
  "mongodb+srv://Naresh:Sasori123@cluster0-8qhff.gcp.mongodb.net/ReadingApp?retryWrites=true&w=majority"
);

mongoose.connection.once("open", () => {
  console.log("Connected to Mongo DB");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(process.env.PORT || 4000, () => {
  console.log("Express server Up and Running");
});
