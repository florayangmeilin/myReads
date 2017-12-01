import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
    state = {
        query: '',
        showingBooks: []
    }
    timeoutID = -1
    updateQuery = (query) => {
        query = query.trim()
        this.setState({ query })
        if (this.timeoutID !== -1) {
            // To reduce invalid search
            clearTimeout(this.timeoutID)
            this.timeoutID = -1
        }
        if (query === '') {
            this.setState({ showingBooks: [] })
            // There is an error when you delete all input
        } else {
            this.timeoutID = setTimeout(() => {
                this.timeoutID = -1
                BooksAPI.search(query, 20).then(queryResult => {
                    let books = (queryResult && !queryResult.error && queryResult) || []
                    const { myReads } = this.props
                    books = books.map(foudBook => {
                        const locateShelf = myReads.find(readBook => readBook.id === foudBook.id)
                        foudBook.shelf = locateShelf ? locateShelf.shelf : 'none'
                        return foudBook
                    })
                    this.setState({ showingBooks: books })
                }, () => {
                })
            }, 2000);
        }
    }

    render() {
        const { query, showingBooks } = this.state
        const { onChangeShelf } = this.props

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className='close-search' to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {showingBooks.map((book) => (
                            <li key={book.id}>
                                <Book
                                    book={book}
                                    onChangeShelf={onChangeShelf}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks