import React from "react";
import "./App.css";
import BookList from "./components/BookList";

import "bootstrap/dist/css/bootstrap.css";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import AddBook from "./components/AddBook";

const client = new ApolloClient({
  uri: "https://naresh-library-app.herokuapp.com/graphql"
  // uri: "http://localhost:4000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="main">
        <h1>My Reading List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
