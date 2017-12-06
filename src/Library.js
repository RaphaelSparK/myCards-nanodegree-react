import React, {Component} from 'react'
import {
  Container,
  Dropdown,
  Image,
  Menu
} from 'semantic-ui-react'

import {Link} from 'react-router-dom'

import Bookshelf from './Bookshelf'

class Library extends Component {

  filterByShelf(shelf) {
    return this
      .props
      .books
      .filter(book => book.shelf === shelf)
  }

  handleChange = (e, { value }) => console.log(value)

  render() {
    const shelves = [
      {
        id: 1,
        text: "Current Reading",
        shelf: 'currentlyReading',
        color: 'red'
      }, {
        id: 2,
        text: "Want to read",
        shelf: 'wantToRead',
        color: 'yellow'
      }, {
        id: 3,
        text: "Read",
        shelf: 'read',
        color: 'green'
      }
    ]
    
    return (
      <div>
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item as='a' header>
              <Image
                size='mini'
                src='/logo.png'
                style={{
                marginRight: '1.5em'
              }}/>
              My Reads
            </Menu.Item>
            <Menu.Item as='a'>Library</Menu.Item>
           
            <Dropdown item simple text='Shelves' onChange={this.handleChange}>
              <Dropdown.Menu>
                <Dropdown.Item>Currently reading</Dropdown.Item>
                <Dropdown.Item>Want to read</Dropdown.Item>
                <Dropdown.Item>Read</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
        </Menu>
        <Container text style={{
          marginTop: '7em',
          marginBottom: '7em'
        }}>
          <div>
            
              
              {this.props.books.length > 0 && (shelves.map(shelf => (
                Bookshelf({
                  key: shelf.id,
                  shelfTag: shelf.text,
                  shelfColor: shelf.color,
                  books: this.filterByShelf(shelf.shelf),
                  onUpdateShelf: this.props.onUpdateShelf
                })
              )))}
              
            
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </Container>

      </div>
    )
  }
}

export default Library