import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class MyReads extends Component {
    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf />
                        <BookShelf />
                        <BookShelf />
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