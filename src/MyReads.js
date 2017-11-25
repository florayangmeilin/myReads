import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class MyReads extends Component {
    render() {
        const shelves = [
            { title: 'Currently Reading', name: 'currentlyReading' },
            { title: 'Want to Read', name: 'wantToRead' },
            { title: 'Read', name: 'read' }
        ].map((o, i) => ({ ...o, id: i }))
        const { books } = this.props

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {shelves.map(shelf => (
                            <div key={shelf.id} className="bookshelf">
                                <h2 className="bookshelf-title">{shelf.title}</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {books.filter(o => (o.shelf === shelf.name)).map(c => (
                                            <li key={c.id}>
                                                <Book book={c} />
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