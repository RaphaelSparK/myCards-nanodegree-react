import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

import { Item, Label, Segment } from 'semantic-ui-react'

const Bookshelf = (props) => {
  const {books} = props

  return (
    <Segment raised key={props.key}>
    <Item.Group >
    <Label as='a' color={props.shelfColor} ribbon>{props.shelfTag}</Label>

    {books.map(book => (<Book key={book.id} book={book} onChangeShelf={props.onUpdateShelf}/>))}
   
  </Item.Group>
  </Segment>
  )
}

Bookshelf.propTypes = {
  books: PropTypes.object
}

export default Bookshelf