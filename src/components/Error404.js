import React from 'react'
import { Link } from 'react-router-dom'
import FaFrownO from 'react-icons/lib/fa/frown-o'

const Error404 = () => (
    <div className="Error404">
        <h1>404</h1>

        <FaFrownO size={40} />

        <p>Opps this post or page could not found.</p>
        <Link
        to='/'
        className='button'
        > Return Home </Link>
    </div>
)

export default Error404