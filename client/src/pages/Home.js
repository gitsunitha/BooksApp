import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Form from "../components/Form";
import Book from "../components/Book";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";
import "./homestyle.css";

class Home extends Component {
  state = {
    books: [],
    q: "Euclid",
    message: "Search For A Book To Begin!",
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  checkIfSaved = () => {
    let savedBooks = [];
    API.getSavedBooks()
      .then((res) => {
        savedBooks = res.data;
        console.log("saved Books");
        console.log(savedBooks);
        let currentState = this.state.books;
        console.log(this.state.books);
        this.setState({
          books: currentState.map((searchedBook) => {
            console.log(searchedBook);
            let filteredArray = [];
            filteredArray = savedBooks.filter(
              savedBooks.googleId === searchedBook.googleId
            );
            if (filteredArray.length > 1) {
              searchedBook.savedFlag = true;
              console.log("found a saved book");
            }
            return searchedBook;
          }),
        });
      })
      .catch((err) => {
        //empty array. should check for sql errors maybe?
      });
  };

  getBooks = () => {
    API.getBooks(this.state.q)
      .then((res) => {
        console.log("Inside the Home.getBooks");
        this.setState({
          books: res.data.map(function (book) {
            book.savedFlag = false;
            console.log(book);
            return book;
          }, this.checkIfSaved),
        });
      })
      .catch(() =>
        this.setState({
          books: [],
          message: "No New Books Found, Try a Different Query",
        })
      );
    //now check if already saved
    this.checkIfSaved();
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.getBooks();
  };

  handleBookSave = (id) => {
    const book = this.state.books.find((book) => book.id === id);

    API.saveBook({
      googleId: book.id,
      title: book.volumeInfo.title,
      subtitle: book.volumeInfo.subtitle,
      link: book.volumeInfo.infoLink,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.thumbnail,
    }).then(() => this.getBooks());
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1 className="text-center">
                <strong>Google Book Library</strong>
              </h1>
              <h2 className="text-center">Search for and Save Books.</h2>
            </Jumbotron>
          </Col>
          <Col size="md-12">
            <Card title="Book Search" icon="far fa-book">
              <Form
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                q={this.state.q}
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Card title="Results">
              {this.state.books.length ? (
                <List>
                  {this.state.books.map((book) => (
                    <Book
                      key={book.id}
                      title={book.volumeInfo.title}
                      subtitle={book.volumeInfo.subtitle}
                      link={book.volumeInfo.infoLink}
                      authors={book.volumeInfo.authors.join(", ")}
                      description={book.volumeInfo.description}
                      image={book.volumeInfo.imageLinks.thumbnail}
                      Button={() => (
                        <button
                          disabled={book.savedFlag}
                          onClick={() => this.handleBookSave(book.id)}
                          className="btn btn-primary ml-2"
                        >
                          Save
                        </button>
                      )}
                    />
                  ))}
                </List>
              ) : (
                <h2 className="text-center">{this.state.message}</h2>
              )}
            </Card>
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

export default Home;
