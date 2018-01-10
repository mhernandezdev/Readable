import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, fetchCategories } from '../actions'
import { withRouter, Link } from 'react-router-dom'
import Comment from './Comment'
import Categories from './Categories'
import FaPlusCircle from 'react-icons/lib/fa/plus-circle'

class Main extends Component {
    state = {
        sorton:'newest',
    }

    componentDidMount(){
        this.props.fetchPosts();
        this.props.fetchCategories();
    }

    sortOnChange(e){
        this.setState({sorton: e.target.value});
    }

    render() {
        const { categories, posts, comments } = this.props;
        const { sorton } = this.state;

        const category = this.props.match.params.category || 'all';
        const id = this.props.match.params.id;

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
                                <Comment key={post.id} category={category} post={post} id={id}></Comment>
                            ))}
                        </div>
                    </div>
                </div>

                <Link
                to={`${category}/post/create`}
                className='add-comment'
                > <FaPlusCircle size={60}/> </Link>

        </div>
        )
  }
}

function mapStateToProps ({ categories, posts, comments }) {
    return { categories, posts, comments };
}

function mapDispatchToProps (dispatch) {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        fetchCategories: () => dispatch(fetchCategories())
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Main))

