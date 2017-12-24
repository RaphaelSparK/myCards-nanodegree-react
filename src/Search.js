import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input } from 'semantic-ui-react'

import * as BooksAPI from './BooksAPI'

import Bookshelf from './Bookshelf'
import _ from 'lodash'


class Search extends Component {

  state = {
    query: '',
    books: []
  }
  
  updateQuery = _.debounce((query) => {
    if (!query) {
      
      this.setState({query: '', books: []})
    } else {
      this.setState({ query: query.trim() })
      
      BooksAPI.search(query).then((books) => {
        console.log(books)
        if (books.error) {
          books = []
        }          
          this.setState({books})
        
      })
    }
  },500)

  render () {
    return (
      <div>
            <div>
              
              <div>
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                  <Input fluid loading={true}  placeholder='Search by title or author' >                  
                    <Link className="close-search" to='/'>Close</Link>
                    <input onChange={(e) => this.updateQuery(e.target.value)} />
                  </Input>

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

export default Search