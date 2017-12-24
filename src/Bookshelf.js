import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

import { Item, Label, Segment } from 'semantic-ui-react'

const Bookshelf = (props) => {
  const {books} = props

  return (
    <Segment raised key={props.key} className={props.visible === 'all' || props.visible === props.shelf ? '' :'hidden'}>
    <Item.Group >
    <Label as='a' color={props.shelfColor} ribbon>{props.shelfTag}</Label>

    {books.length > 0 ? books.map(book => (
      <Book key={book.id} book={book} onChangeShelf={props.onUpdateShelf}/>
    )): <h1>Empty shelf</h1>}

  </Item.Group>
  </Segment>
  )
}

Bookshelf.propTypes = {
  books: PropTypes.object,
  visible: PropTypes.string,
  shelfTag: PropTypes.string.isRequired,
  shelf: PropTypes.string.isRequired,
  shelfColor: PropTypes.string.isRequired,
  onUpdateShelf: PropTypes.func.isRequired,
}

export default Bookshelf