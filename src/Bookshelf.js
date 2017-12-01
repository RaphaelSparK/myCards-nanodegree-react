import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const Bookshelf = (props) => {
    const { books } = props

    return (
      <div key={props.key} className="bookshelf">
        <h2 className="bookshelf-title">{props.shelfTag}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <Book key={book.id} book={book} onChangeShelf={props.changeShelf}/>
            ))}
          </ol>
        </div>
      </div>
    )
  }


Bookshelf.propTypes = {
  books: PropTypes.object
}

export default Bookshelf