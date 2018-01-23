import React from 'react'
import { capitalize } from '../utils/helpers'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import Vote from './Vote'
import Reply from './Reply'
import TiUser from 'react-icons/lib/ti/user'
import MdMoreVert from 'react-icons/lib/md/more-vert'

const Post = (props) => {

    const { post, category, id, comments, detail } = props;

    // link based on URL // direct to post or comment
    let linkTo = `/${category}/${post.id}`;

    // if an id on the url then we are already on a post details page - opening a child comment
    if(id && post && post.parentId){
        linkTo = `/${category}/${post.parentId}/${post.id}`;
    }

    // get comments // list newest to oldest
    let myComments = [];
    comments && (myComments = Object.values(comments)
                                .filter(comment => comment.parentId===post.id))
                                .sort((a, b) => b.timestamp > a.timestamp);

    return (
        <div className={`post ${(post.parentId && 'post-comment') || 'post-root'}`}>

            <Link to={linkTo} className={`post-link ${detail ? 'post-link-disabled' : ''}`}>
                <div className="post-user-icon">
                    <TiUser size={20} />
                </div>

                <div className="post-wrap-author-date">
                    <span className="post-author">{post.author}</span>
                    <span className="post-date">
                    &nbsp;on { new Date(post.timestamp).toDateString() } { new Date(post.timestamp).toLocaleTimeString() }
                    </span>

                    <div className="post-more-icon"><MdMoreVert size={20} /></div>
                </div>

                { post.category &&
                    <span>
                        <span className="post-category">{capitalize(post.category)}:</span> <span className="post-title">{post.title}</span>
                    </span>
                }

                <div className="post-body">{post.body}</div>
            </Link>

            <Vote post={post} />

            {!post.parentId &&
                <Reply comments={ myComments.length>0 } parentId={post.id}  />
            }

            {myComments.map(comment => (
                <Post key={comment.id} post={comment} category={category} id={id}></Post>
            ))}

        </div>
    )
}

function mapStateToProps ({ comments }) {
    return { comments };
}

export default withRouter(connect(
    mapStateToProps
)(Post))