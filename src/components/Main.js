import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import Post from './Post'
import Categories from './Categories'
import FaPlusCircle from 'react-icons/lib/fa/plus-circle'
import { sortOn } from '../actions/sortonActions'
import { setSelectedCategory } from '../actions/APIActions'

class Main extends Component {

    componentWillReceiveProps(nextProps){
        // storing category for back button
        const { categories, setSelectedCategory } = this.props;
        const category = nextProps.match.params.category || 'all';
        category !== categories.selected && setSelectedCategory(category);
    }

    sortOnChange(e){
        this.props.sortOn( e.target.value );
    }

    render() {
        const { categories, posts, sort } = this.props;

        const category = this.props.match.params.category || 'all';

        // reduce by category and sort // convert post into an array
        const postArray = Object.values(posts);
        const postFiltered = (category==='all' && postArray) || postArray.filter(post => post.category === category);
        const postSorted = (sort==="newest" && postFiltered.sort((a, b) => b.timestamp > a.timestamp)) ||
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
                            <h2>Posts:
                                <select className="sort-on" value={sort} onChange={(e) => this.sortOnChange(e)}>
                                    <option value="newest">Sort on: Newest</option>
                                    <option value="likes">Sort on: Likes</option>
                                </select>
                            </h2>

                            {postSorted && postSorted.map(post => (
                                <Post key={post.id} post={post} ></Post>
                            ))}
                        </div>
                    </div>
                </div>

                <Link
                to={`/create`}
                className='add-comment'
                > <FaPlusCircle size={60}/> </Link>

        </div>
        )
  }
}

function mapStateToProps ({ categories, posts, sort }) {
    return { categories, posts, sort };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ sortOn, setSelectedCategory }, dispatch);
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Main))

