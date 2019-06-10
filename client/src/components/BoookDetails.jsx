import React, { Component } from "react";
import { getBookQuery } from "../queries/queries";
import { graphql } from "react-apollo";
class BookDetails extends Component {
  state = {};
  displayBookDetails = () => {
    const { book } = this.props.data;
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>Author: {book.author.name}</p>
          <p>More books by {book.author.name}</p>
          <ul className="other-books">
            {book.author.books.map(item => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected...</div>;
    }
  };
  render() {
    return (
      <div id="book-details" className="bg-danger">
        {this.displayBookDetails()}
      </div>
    );
  }
}

export default graphql(getBookQuery, {
  options: props => {
    return {
      variables: {
        id: props.bookId
      }
    };
  }
})(BookDetails);
