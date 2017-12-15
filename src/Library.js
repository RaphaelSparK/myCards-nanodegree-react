import React, {Component} from 'react'

import {Link} from 'react-router-dom'

import Bookshelf from './Bookshelf'

class Library extends Component {



  filterByShelf(shelf) {
    return this
      .props
      .books
      .filter(book => book.shelf === shelf)
  }



  render() {

    const { shelves } = this.props

    return (
      <div>
          <div>
              {this.props.books.length > 0 && (shelves.filter(s => s.value !== 'all').map(shelf => (
                Bookshelf({
                  visible: this.props.display,
                  key: shelf.key,
                  shelfTag: shelf.text,
                  shelf: shelf.value,
                  shelfColor: shelf.color,
                  books: this.filterByShelf(shelf.value),
                  onUpdateShelf: this.props.onUpdateShelf
                })
              )))}
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
       

      </div>
    )
  }
}

export default Library