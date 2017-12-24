import React, {Component} from 'react'

import {Link} from 'react-router-dom'
import {Button} from 'semantic-ui-react'
import PropTypes from 'prop-types'

import Bookshelf from './Bookshelf'

class Library extends Component {

  filterByShelf(shelf) {
    return this
      .props
      .books
      .filter(book => book.shelf === shelf)
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { shelves, onUpdateShelf } = this.props

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
                  onUpdateShelf: onUpdateShelf
                })
              )))}
          </div>
          <Button as={Link} to="/search" size='massive' circular icon='plus' color='blue' className="open-search"  />
      </div>
    )
  }
}

Library.propTypes = {
  books: PropTypes.array,
  shelves: PropTypes.array.isRequired,
  onUpdateShelf: PropTypes.func.isRequired,
}


export default Library