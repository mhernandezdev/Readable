import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { addPost, updatePost } from '../actions/APIActions'

class CommentForm extends Component {
    static defaultProps = {
        /* post - seed data for internally-controlled state */
        post: {
            author:'',
            body:'',
            id: Math.random().toString(36).substr(-8),
            parentId:''
        },
        parentId:'',
        mode:'new',
        formCompleted:function(){}
    }
    state = {
        author:this.props.post.author,
        body:this.props.post.body,
        authorFail:false,
        bodyFail:false
    }

    handleTextChange = (e) => {
        const {name, value} = e.target;
        this.setState({ [name]:value, [`${name}Fail`]:value==='' });
    }

    handlePost = (e) => {
        e.preventDefault();

        const { mode, post, parentId } = this.props;
        const { id } = post;
        const { author, body } = this.state;

        // some validation
        this.setState({ authorFail:author==='', bodyFail:body==='' });
        if(author!=='' && body!==''){
            // call addComment
            const data = {
                parentId,
                id,
                author,
                body,
                timestamp: Date.now()
            }

            this.props[(mode==='new' && 'addPost') || 'updatePost']({type:'comments', body:data, id});

            this.props.formCompleted();
        }
    }

    render() {
        const { author, body, authorFail, bodyFail } = this.state;
        const { mode, formCompleted } = this.props;

        return (
            <div className="post-add-comment">
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

                    <div className="button"  onClick={ formCompleted }>Cancel</div>
                    <button>{ (mode==='new' && 'Post') || 'Save' }</button>
                </form>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addPost, updatePost }, dispatch);
}

export default connect(null, mapDispatchToProps)(CommentForm);

