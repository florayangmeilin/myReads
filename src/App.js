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
    BooksAPI.getAll().then((booksOnShelf) => {
      this.setState({ books: booksOnShelf })
    })
  }
  updateShelf = ((book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      if (this.state.books.includes(book)) {
        this.setState({ books: this.state.books.map(o => o.id === book.id ? { ...o, shelf } : { ...o }) })
      } else {
        this.setState({ books: this.state.books.concat([{ ...book, shelf }]) })
      }
    })
  })

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <MyReads
            books={this.state.books}
            onChangeShelf={this.updateShelf}
          />)
        } />
        <Route path='/search' render={() => (
          <SearchBooks
            onChangeShelf={this.updateShelf}
            myReads={this.state.books}
          />)
        } />
      </div>
    )
  }
}

export default BooksApp
