import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import { DebounceInput } from 'react-debounce-input';

class SearchBooks extends Component {
    state = {
        query: '',
        showingBooks: []
    }
    updateQuery = (query) => {
        query = query.trim()
        this.setState({ query })
        if (query === '') {
            this.setState({ showingBooks: [] })
            // There is an error when you delete all input
        } else {
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
                        {/* <Debounce handler="onChange" >
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => {
                                console.log('event = ', event.target.value)
                                this.updateQuery(event.target.value)
                            }}
                        />
                        </Debounce> */}
                        <DebounceInput
                            type="text"
                            placeholder="Search by title or author"
                            debounceTimeout={300}
                            value={query}
                            onChange={event => {
                                this.updateQuery(event.target.value)
                                console.log('event = ', event.target.value)
                            }} />
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