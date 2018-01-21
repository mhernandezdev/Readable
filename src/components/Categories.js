import React from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { capitalize } from '../utils/helpers'

const Categories = (props) => {

    /* all selected for '/' and 'category/all' */
    const { categories } = props;
    const { category } = props.match.params;

    return (
        <div>
            <h2>Categories:</h2>

            <ul className="categories">
                {categories && categories.map(c => (
                    <li key={c.name}>
                        <NavLink exact
                        key={c.name}
                        to={c.pathabs || `/category/${c.path}`}
                        className={c.name==='all' && category==='all' ? 'selected' : ''}
                        activeClassName='selected'
                        >{capitalize(c.name)}</NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default withRouter(Categories)