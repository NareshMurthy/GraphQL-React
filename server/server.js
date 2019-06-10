const express = require("express");
const schema = require("./schema/schema");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const path = require("path");

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
    graphiql: false
  })
);

console.log(process.env.NODE_ENV);

console.log(process.env.PORT);

console.log(process.env.PORT || 5000);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Express server Up and Running");
});
