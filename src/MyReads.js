import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class MyReads extends Component {
    render() {
        const shelves = [
            { title: 'Currently Reading', name: 'currentlyReading' },
            { title: 'Want to Read', name: 'wantToRead' },
            { title: 'Read', name: 'read' }
        ]
        const { books, onChangeShelf } = this.props

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {shelves.map(shelf => (
                            <div key={shelf.name} className="bookshelf">
                                <h2 className="bookshelf-title">{shelf.title}</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {books.filter(book => (book.shelf === shelf.name)).map(bookOnThisShelf => (
                                            <li key={bookOnThisShelf.id}>
                                                <Book
                                                    book={bookOnThisShelf}
                                                    onChangeShelf={onChangeShelf} />
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="open-search">
                    <Link className='close-search' to='/search'>Close</Link>
                </div>
            </div>
        )
    }
}

export default MyReads