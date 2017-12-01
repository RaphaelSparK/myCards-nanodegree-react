import React from 'react'

import {Route} from 'react-router-dom'
import './App.css'

import * as BooksAPI from './BooksAPI'

import Library from './Library'
import Search from './Search'


class App extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI
      .getAll()
      .then((books) => {
        this.setState({books})
      })

  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
        <Library books={this.state.books}/>)}/>

        <Route path='/search' component={Search}/>

      </div>
    )
  }
}

export default App
