import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Item, Icon, Rating, Accordion} from 'semantic-ui-react'

class Book extends Component {

  state = {
    activeIndex: 0
  }

  handleClick = (e, titleProps) => {
    const {index} = titleProps
    const {activeIndex} = this.state
    const newIndex = activeIndex === index
      ? -1
      : index

    this.setState({activeIndex: newIndex})
  }

  updateShelf = (e) => {
    this
      .props
      .onChangeShelf(this.props.book, e.target.value)
  }

  render() {
    const {activeIndex} = this.state
    const {book} = this.props

    return (
      <Item >
        <Item.Image size='small' src={book.imageLinks.thumbnail}/>

        <Item.Content>
          <Item.Header as='span'>{book.title}</Item.Header>
          <Item.Description>
            <Accordion>
              <Accordion.Title
                active={activeIndex !== 0}
                index={0}
                onClick={this.handleClick}>
                <Icon name='dropdown'/>
                Description
              </Accordion.Title>
              <Accordion.Content active={activeIndex !== 0}>
                {book.description}
              </Accordion.Content>
            </Accordion>
          </Item.Description>
          <Item.Extra>
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={this.updateShelf}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
            <span>Average rating:</span>
            <Rating icon='star' defaultRating={book.averageRating} maxRating={5} disabled/>
          </Item.Extra>
        </Item.Content>
      </Item>
    )
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired
}

export default Book