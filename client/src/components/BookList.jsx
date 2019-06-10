import React, { Component } from "react";
import { getBooksQuery } from "../queries/queries";
import { graphql } from "react-apollo";
import BoookDetails from "./BoookDetails";

class BookList extends Component {
  state = { selected: null };
  displayBooks = () => {
    var data = this.props.data;
    if (data.loading) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    } else {
      return data.books.map(book => {
        return (
          <li
            key={book.id}
            onClick={e => {
              this.setState({ selected: book.id });
            }}
          >
            {book.name}
          </li>
        );
      });
    }
  };
  render() {
    return (
      <div>
        <ul id="book-list">{this.displayBooks()}</ul>
        <BoookDetails bookId={this.state.selected} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
