import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addComment } from '../actions'

class Reply extends Component {
    state = {
        display:false,
        author:'',
        body:'',
        authorFail:false,
        bodyFail:false
    }

    addReplyClicked = () => {
        this.setState((prevState, props) => {
            return {display: !prevState.display };
        });
    }

    handleAuthorChange = (e) => {
        this.setState({ author: e.target.value, authorFail:e.target.value==='' });
    }

    handleBodyChange = (e) => {
        this.setState({ body: e.target.value, bodyFail:e.target.value==='' });
    }

    handlePost = (e) => {
        e.preventDefault();

        // some validation
        const { author, body } = this.state;
        if(author==='' || body===''){
            this.setState({ authorFail:author==='', bodyFail:body==='' });
        }else{
            // call addComment
            const comment = {
                        parentId: this.props.parentId,
                        id: Math.random().toString(36).substr(-8),
                        timestamp: Date.now(),
                        author,
                        body
                    }
            this.props.addComment(comment);

            // clear and close the reply form

        }
    }

    render() {
        const { display, author, body, authorFail, bodyFail   } = this.state;

        return (
            <div className="post-add-comment">
                <div><span className="post-reply-txt">Replies</span> <span onClick={this.addReplyClicked}>Add a Reply</span></div>
                { display &&
                    <form onSubmit={this.handlePost}>
                        <input
                        type="text"
                        autoFocus placeholder="Author"
                        value={author}
                        onChange={this.handleAuthorChange}
                        className={authorFail ? 'FAIL' : ''}
                        />

                        <textarea
                        placeholder="Leave a reply"
                        value={body}
                        onChange={this.handleBodyChange}
                        className={bodyFail ? 'FAIL' : ''}
                        />
                        <button>Post</button>
                    </form>
                }
            </div>
        )
    }
}

function mapDispatchToProps (dispatch) {
    return {
        addComment: (data) => dispatch(addComment(data))
    }
}

export default connect(null, mapDispatchToProps)(Reply);

