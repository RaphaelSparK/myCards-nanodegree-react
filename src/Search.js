import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import * as BooksAPI from './BooksAPI'

import Bookshelf from './Bookshelf'
import _ from 'lodash'


class Search extends Component {

  state = {
    query: '',
    books: [],
    loading: false
  }

  updateQuery = _.debounce((query) => {
    if (!query) {

      this.setState({query: '', books: []})
    } else {
      this.setState({ query: query.trim() })
      this.setState({loading: true})
      BooksAPI.search(query).then((books) => {
        if (books.error) {
          books = []
        }
          this.props.booksOnShelves.filter(o => books.some(o2 => o.id === o2.id? o2.shelf = o.shelf: ''))
          this.setState({books})
          this.setState({loading: false})
      })
    }
  },500)

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render () {
    return (
      <div className='search-books-bar'>
            <div>
              <div>
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                  <Input
                    fluid
                    action={<Link className="close-search" to='/'>Close</Link>}
                    actionPosition='left'
                    loading={this.state.loading}
                    placeholder='Search by title or author'
                    onChange={(e) => this.updateQuery(e.target.value)}
                  />
              </div>
            </div>
            <div className="search-books-results">
                {this.state.books.length > 0 && Bookshelf({
                  shelfTag: 'Books',
                  shelfColor: 'blue',
                  books: this.state.books,
                  onUpdateShelf: this.props.onUpdateShelf
                })}
            </div>
          </div>
    )
  }
}

Search.propTypes = {
  books: PropTypes.array,
  onUpdateShelf: PropTypes.func.isRequired,
}

export default Search