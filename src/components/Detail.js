import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Post from './Post'
import PostForm from './PostForm'
import FaAngleLeft from 'react-icons/lib/fa/angle-left'

class Detail extends Component {
    static defaultProps = {
        createView: false,
    }

    getLinkTo(){
        const category = this.props.categories.selected;
        const linkTo = category==='all' ? '/' : `/${category}`;
        return linkTo;
    }

    viewCompleted = ( formSubmitted ) => {
        // returns to root
        this.props.history.push( this.getLinkTo() );
    }

    render() {
        const { createView, posts } = this.props;
        const { post_id } = this.props.match.params;

        const linkTo = this.getLinkTo();
        const post = posts[post_id];

        return (
            <div className="detail">
                <div className="header-child">
                    <Link className='close-btn' to={linkTo} >
                        <FaAngleLeft size={30} /> Back
                    </Link>
                </div>

                <div className="main">
                    <h1>{createView ? 'Create' : 'Detail'}</h1>

                    {/* form or post */}
                    { (createView &&
                        <PostForm post={ post }
                        mode="new"
                        formCompleted={ this.viewCompleted } />) ||
                        (post && <Post post={ post } detailView={ true } postCompleted={ this.viewCompleted } />)
                    }

                </div>

            </div>
        )
    }
}

function mapStateToProps({ posts, categories }) {
  return { posts, categories }
}

export default withRouter(connect(mapStateToProps)(Detail));
