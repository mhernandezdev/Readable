import React from 'react'
import Vote from './Vote'
import CommentForm from './CommentForm'
import PostControls from './PostControls'
import TiUser from 'react-icons/lib/ti/user'

const Comment = (props) => {

    const { post, displayForm, editClicked } = props;

    return (
        <div className="post post-comment">

            <div className="post-user-icon">
                <TiUser size={20} />
            </div>

            <PostControls post={ post } onEdit={ () => editClicked(post.id) } />

            {(displayForm &&
            <CommentForm parentId={ post.parentId } post={ post } mode={`edit`} formCompleted={ () => editClicked('') } /> ) ||
                <div>
                    <div className="post-wrap-author-date">
                        <span className="post-author">{post.author}</span>
                        <span className="post-date">
                        &nbsp;on { new Date(post.timestamp).toDateString() } { new Date(post.timestamp).toLocaleTimeString() }
                        </span>
                    </div>

                    <div className="post-body">{post.body}</div>

                    <Vote post={ post } />
                </div>
            }

        </div>
    )
}

export default Comment