import React, { Component } from 'react'


import {Link} from 'react-router-dom'

import Bookshelf from './Bookshelf'


class Library extends Component {



  filterByShelf(shelf) {
    return this.props.books.filter( book => book.shelf === shelf )
  }

  render () {
    const shelves = [
      { id: 1,shelfTag: "Current Reading",shelf: 'currentlyReading'},
      { id: 2,shelfTag: "Want to read",shelf: 'wantToRead'},
      { id: 3,shelfTag: "Read",shelf: 'read'},
    ]

    return (
      <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>

                { this.props.books.length > 0 && (shelves.map(shelf => (
                  Bookshelf({ key: shelf.id, shelfTag: shelf.shelfTag, books: this.filterByShelf(shelf.shelf) }))))}

              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
    )
  }
}

export default Library