import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import MyReads from './MyReads'
import SearchBooks from './SearchBooks'


class BooksApp extends Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  render() {
    return (
      <div className="app">
        <Route exact path='/'
          render={() => (<MyReads />)
          } />
        <Route path='/search' render={() => (
          <SearchBooks
            books={this.state.books}
          />)
        } />
      </div>
    )
  }
}

export default BooksApp
