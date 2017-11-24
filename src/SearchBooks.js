import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class SearchBooks extends Component {
    render() {
        const { books } = this.props

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className='close-search' to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <li>
                                <Book book={book} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks