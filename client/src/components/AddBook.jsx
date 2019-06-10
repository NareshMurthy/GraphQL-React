import React, { Component } from "react";
import { graphql, compose } from "react-apollo";

import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../queries/queries";

class AddBook extends Component {
  state = {
    name: "",
    genre: "",
    authorid: ""
  };

  enableButton() {
    const { name, genre, authorid } = this.state;
    if (name === "" || genre === "" || authorid === "") {
      return (
        <button disabled="disabled" className="btn btn-dark disabled">
          + Add Book
        </button>
      );
    } else {
      return <button className="btn btn-dark">+ Add Book</button>;
    }
  }

  displayAuthors = () => {
    var data = this.props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled>Loading...</option>;
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };

  submitForm = e => {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorid: this.state.authorid
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
    this.setState({ name: "", genre: "" });
  };

  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm}>
        <div
          className="card text-white bg-danger mb-3"
          id="add-book"
          style={{ width: "21rem" }}
        >
          <div className="card-header">{this.enableButton()}</div>
          <div className="card-body">
            <div className="field form-group">
              <label htmlFor="bookName">Book name:</label>
              <input
                className="form-control"
                id="bookName"
                placeholder="Book Name..."
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
              />
            </div>
            <div className="field form-group">
              <label htmlFor="genre">Genre:</label>
              <input
                className="form-control"
                id="genre"
                placeholder="Genre..."
                value={this.state.genre}
                onChange={e => this.setState({ genre: e.target.value })}
              />
            </div>
            <div className="field form-group">
              <label htmlFor="author">Author:</label>

              <select
                id="author"
                className="form-control"
                onChange={e => this.setState({ authorid: e.target.value })}
              >
                <option>Select author</option>
                {this.displayAuthors()}
              </select>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
