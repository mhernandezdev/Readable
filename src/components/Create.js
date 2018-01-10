import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Create = (props) => (
    <div>
        <Link className='close-search' to={props.previous.pathname} >Close</Link>

        <h1>Create</h1>

        Title, Body, Author, timestamp (in user readable format), and vote score
        <form>
            <input type="text" placeholder="Title" value="" />
            <input type="text" placeholder="Comment" value=""  />
            <button type="submit">Submit</button>
        </form>


    </div>
)

function mapStateToProps({previous}) {
  return {previous}
}

export default connect(mapStateToProps)(Create);
