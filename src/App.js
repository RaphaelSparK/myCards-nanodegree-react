import React from 'react'

import {Route, Link} from 'react-router-dom'
import {
  Container,
  Dropdown,
  Menu
} from 'semantic-ui-react'


import './App.css'

import * as BooksAPI from './BooksAPI'

import Library from './Library'
import Search from './Search'


class App extends React.Component {

  constructor() {
    super();
    this.loadBooks = this.loadBooks.bind(this);
  }
  state = {
    books: [],
    displayShelf: 'all'
  }

  componentDidMount() {
   this.loadBooks()
  }

  loadBooks = () =>{
    BooksAPI
    .getAll()
    .then((books) => {
      this.setState({books})
    })
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      this.setState({
        books: this.state.books.filter(b => b.id !== book.id).concat(book)
      })
    })
  }

  handleChange = (e,d) => this.setState({displayShelf: d.value});

  render() {

    const shelves = [
      {
        key: 1,
        text: "Current Reading",
        value: 'currentlyReading',
        color: 'red'
      }, {
        key: 2,
        text: "Want to Read",
        value: 'wantToRead',
        color: 'yellow'
      }, {
        key: 3,
        text: "Read",
        value: 'read',
        color: 'green'
      }, {
        key: 4,
        text: "All",
        value: 'all',
        color: 'black'
      }
    ]

    return (
      <div className="app">
        <Menu color='blue' fixed='top' inverted>
          <Container>
            <Menu.Item as='a' header>
              My Reads
            </Menu.Item>
            <Menu.Item as={Link} to='/'>Library</Menu.Item>
            <Dropdown text='Shelves' options={shelves} simple item  onChange={this.handleChange}/>
          </Container>
        </Menu>
        <Container text style={{
          marginTop: '3em',
          marginBottom: '3em'
        }}>

        <Route exact path='/' render={() => (
        <Library books={this.state.books} shelves={shelves} display={this.state.displayShelf} onUpdateShelf={this.updateBook}/>)} />

        <Route path='/search' render={() => (
        <Search booksOnShelves={this.state.books} onUpdateShelf={this.updateBook} />)} />
        </Container>
      </div>
    )
  }
}

export default App
