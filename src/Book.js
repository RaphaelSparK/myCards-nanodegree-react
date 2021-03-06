import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Item, Icon, Rating, Accordion, Dropdown} from 'semantic-ui-react'

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

  updateShelf = (e, {value}) => {

    if (this.props.book.shelf !== value) {
      this
        .props
        .onChangeShelf(this.props.book, value)
    }
  }

  render() {
    const shelves = [
      {
        id: 1,
        text: "Current Reading",
        value: 'currentlyReading',
        label: {
          color: 'red',
          empty: true,
          circular: true
        }
      }, {
        id: 2,
        text: "Want to read",
        value: 'wantToRead',
        label: {
          color: 'yellow',
          empty: true,
          circular: true
        }
      }, {
        id: 3,
        text: "Read",
        value: 'read',
        label: {
          color: 'green',
          empty: true,
          circular: true
        }
      }, {
        id: 4,
        text: "None",
        value: 'none',
        label: {
          color: 'blue',
          empty: true,
          circular: true
        }
      }
    ]

    const {activeIndex} = this.state
    const {book} = this.props
    let value

    return (
      <Item >
        <Item.Image size='small' src={book.imageLinks.thumbnail}/>
        <Item.Content>
          <Item.Header as='span'>{book.title}</Item.Header>
          <p>{book.authors
              ? book
                .authors
                .join(', ')
              : ''}</p>
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
            <span>Average rating:</span>
            <Rating icon='star' defaultRating={book.averageRating} maxRating={5} disabled/>
          </Item.Extra>
          <Item.Extra>
            <Dropdown
              simple
              onChange={this.updateShelf}
              options={shelves}
              placeholder='Change Shelf'
              button
              item
              value={value}
              defaultValue={book.shelf}
              className='icon'/>
          </Item.Extra>
        </Item.Content>
      </Item>
    )
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

export default Book