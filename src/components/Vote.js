import React from 'react'
import { connect } from 'react-redux'
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up'
import FaThumbsDown from 'react-icons/lib/fa/thumbs-down'
import { updateVote } from '../actions'

const Vote = ({ post, updateVote }) => {

    const type = post.parentId ? 'comments' : 'posts';
    const voteUp = () => updateVote({ type:type, id:post.id, option:'upVote' });
    const voteDown = () => updateVote({ type:type, id:post.id, option:'downVote' });

    return (
        <div className="post-vote">
            <span className="vote-score">{post.voteScore}</span>
            <span className="vote-btns">
                <div className="vote-btn"  onClick={voteUp} >
                    <FaThumbsUp size={16}/> Like
                </div> - <div className="vote-btn"  onClick={voteDown} >
                    <FaThumbsDown /> Lame
                </div>
            </span>
        </div>
    )
}

function mapDispatchToProps (dispatch) {
    return {
        updateVote: (data) => dispatch(updateVote(data))
    }
}

export default connect(null, mapDispatchToProps)(Vote);
