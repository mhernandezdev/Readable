import React from 'react'
import { Link } from 'react-router-dom'

const Error404 = () => (
    <div>
        <h1>404</h1>
        <p>Opps page not found</p>
        <Link
        to='/'
        className='button'
        > Return Home </Link>
    </div>
)

export default Error404