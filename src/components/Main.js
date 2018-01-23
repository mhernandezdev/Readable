import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import Post from './Post'
import Categories from './Categories'
import FaPlusCircle from 'react-icons/lib/fa/plus-circle'

class Main extends Component {
    state = {
        sorton:'newest',
    }

    sortOnChange(e){
        this.setState({sorton: e.target.value});
    }

    render() {
        const { categories, posts } = this.props;
        const { sorton } = this.state;

        const category = this.props.match.params.category || 'all';

        // reduce by category and sort // convert post into an array
        const postArray = Object.values(posts);
        const postFiltered = (category==='all' && postArray) || postArray.filter(post => post.category === category);
        const postSorted = (sorton==="newest" && postFiltered.sort((a, b) => b.timestamp > a.timestamp)) ||
        postFiltered.sort((a, b) => b.voteScore > a.voteScore);

        return (
            <div className='container'>

                <header className='nav'>
                    <h1 className='header'>Readable</h1>
                </header>

                <div className="main">
                    <div className="row row-main">
                        <div className="column col-1">
                            <Categories categories={categories} />
                        </div>

                        <div className="column col-2">
                            <h2>Comments:
                                <select className="sort-on" value={sorton} onChange={(e) => this.sortOnChange(e)}>
                                    <option value="newest">Sort on: Newest</option>
                                    <option value="likes">Sort on: Likes</option>
                                </select>
                            </h2>

                            {postSorted && postSorted.map(post => (
                                <Post key={post.id} category={category} post={post} ></Post>
                            ))}
                        </div>
                    </div>
                </div>

                <Link
                to={`/${category}/create`}
                className='add-comment'
                > <FaPlusCircle size={60}/> </Link>

        </div>
        )
  }
}

function mapStateToProps ({ categories, posts }) {
    return { categories, posts };
}

export default withRouter(connect(
    mapStateToProps
)(Main))

