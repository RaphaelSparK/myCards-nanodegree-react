import React from 'react'

import {Route} from 'react-router-dom'

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
    books: []
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

 

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
        <Library books={this.state.books} onUpdateShelf={this.updateBook}/>)} />

        <Route path='/search' component={Search}/>

      </div>
    )
  }
}

export default App
