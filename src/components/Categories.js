import React from 'react'
import { NavLink } from 'react-router-dom'
import { capitalize } from '../utils/helpers'

const Categories = ({categories}) => (
    <div>
        <h2>Categories:</h2>

        {/* no resulte in this cat ask the user to create one */}

        <ul className="categories">
            {categories && categories.map(c => (
                <li key={c.name}>
                    <NavLink exact
                    key={c.name}
                    to={c.pathabs || `/${c.path}`}
                    activeClassName="selected"
                    >{capitalize(c.name)}</NavLink>
                </li>
            ))}
        </ul>
    </div>
)

export default Categories