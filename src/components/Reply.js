import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost } from '../actions'

class Reply extends Component {
    state = {
        display:false,
        author:'',
        body:'',
        authorFail:false,
        bodyFail:false
    }

    addReplyClicked = () => {
        this.setState((prevState) => { return {display: !prevState.display} });
    }

    handleTextChange = (e) => {
        const {name, value} = e.target;
        this.setState({ [name]:value, [`${name}Fail`]:value==='' });
    }

    handlePost = (e) => {
        e.preventDefault();

        // some validation
        const { author, body } = this.state;
        this.setState({ authorFail:author==='', bodyFail:body==='' });

        const {authorFail, bodyFail} = this.state;
        if(!authorFail || !bodyFail){
            // call addComment
            const data = {
                parentId: this.props.parentId,
                id: Math.random().toString(36).substr(-8),
                timestamp: Date.now(),
                author,
                body
            }
            this.props.addPost({type:"comments", body:data});

            // clear and close the reply form
            this.setState((prevState) => {
                return { author:'', body:'', display: false };
            });
        }
    }

    render() {
        const { display, author, body, authorFail, bodyFail   } = this.state;
        const { comments } = this.props;

        return (
            <div className="post-add-comment">
                <div>
                    {comments && <span className="post-reply-txt">Replies</span> }
                    <span className="post-add-reply-txt" onClick={this.addReplyClicked}>Add a Reply</span>
                </div>
                { display &&
                    <form onSubmit={this.handlePost}>
                        <input
                        type="text"
                        autoFocus placeholder="Author"
                        name="author"
                        value={author}
                        onChange={this.handleTextChange}
                        className={authorFail ? 'FAIL' : ''}
                        />

                        <textarea
                        placeholder="Leave a reply"
                        name="body"
                        value={body}
                        onChange={this.handleTextChange}
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
        addPost: (data) => dispatch(addPost(data))
    }
}

export default connect(null, mapDispatchToProps)(Reply);

