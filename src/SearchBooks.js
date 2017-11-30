import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
    state = {
        query: '',
        showingBooks: []
    }
    searchCount = 0
    timeoutID = -1
    updateQuery = (query) => {
        query = query.trim()
        this.setState({ query })
        if (this.timeoutID !== -1) {
            // Cancel search request if there is input within 2 seconds
            clearTimeout(this.timeoutID)
        }
        if (query === '') {
            // If query is empty, there will be an error from BooksAPI.search
            this.setState({ showingBooks: [] })
        } else {
            // start to search after 2 seconds
            this.timeoutID = setTimeout(() => {
                this.timeoutID = -1
                this.searchCount++
                console.log('add searchCount = ', this.searchCount)
                BooksAPI.search(query, 20).then(queryResult => {
                    if (this.searchCount > 0) this.searchCount--
                    console.log('ok searchCount = ', this.searchCount)
                    if (this.searchCount === 0) {
                        let books = (queryResult && !queryResult.error && queryResult) || []
                        const { myReads } = this.props
                        books = books.map(o => {
                            const f = myReads.find(o1 => o1.id === o.id)
                            o.shelf = f ? f.shelf : 'none'
                            return o
                        })
                        this.setState({ showingBooks: books })
                    }
                }).catch(() => {
                    if (this.searchCount > 0) this.searchCount--
                    console.log('failed searchCount = ', this.searchCount)
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