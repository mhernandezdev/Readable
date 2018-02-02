import React, { Component } from 'react'
import { capitalize } from '../utils/helpers'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import Vote from './Vote'
import PostForm from './PostForm'
import Comment from './Comment'
import CommentForm from './CommentForm'
import PostControls from './PostControls'
import TiUser from 'react-icons/lib/ti/user'
import FaComment from 'react-icons/lib/fa/comment'

class Post extends Component {
    static defaultProps = {
        detailView:false,
        postCompleted:() => '',
    }

    state = {
        displayForm: false,
        displayAddCommentForm: false,
        displayEditCommentForm:'',
    }

    componentWillMount(){
        if(this.props.location.state && this.props.location.state.editLink){
            this.setState({displayForm: true });
        }
    }

    // allow only one form open at a time
    editClicked = () => {
        const { post, detailView } = this.props;
        if(!detailView){
            this.props.history.push({pathname:`/${post.category}/${post.id}`, state:{editLink:true}});
        }else{
            this.setState((prevState) => { return {
                displayForm: !prevState.displayForm,
                displayEditCommentForm: '',
                displayAddCommentForm: false
            } });
        }
    }

    commentEditClicked = (id) => {
        this.setState((prevState) => { return {
            displayEditCommentForm: prevState.displayEditCommentForm===id ? '' : id,
            displayAddCommentForm: false} });
    }

    addReplyClicked = () => {
        this.setState((prevState) => { return {
            displayAddCommentForm: !prevState.displayAddCommentForm,
            displayEditCommentForm: ''
        } });
    }

    render(){
        const { post, comments, detailView, postCompleted } = this.props;
        const { displayForm, displayAddCommentForm, displayEditCommentForm } = this.state;

        const linkTo = `/${post.category}/${post.id}`;
        const linkClass = `post-link ${detailView ? 'post-link-disabled' : ''}`;

        // get comments // always list newest to oldest
        let myComments = [];
        comments && (myComments = Object.values(comments)
                .filter(comment => comment.parentId===post.id))
                .sort((a, b) => b.timestamp > a.timestamp);

        return (
            <div className="post post-root">

                <div className="post-controls">
                    {!detailView && <Link to={linkTo} >Details</Link>}
                    <PostControls post={ post } onEdit={ this.editClicked } onDeleted={ postCompleted } />
                </div>


                {(displayForm && <PostForm post={ post } mode={`edit`} formCompleted={ this.editClicked } />) ||

                    <div>
                        <div className="post-user-icon">
                            <TiUser size={20} />
                        </div>

                        <div className="post-wrap-author-date">
                            <span className="post-author">{post.author}</span>
                            <span className="post-date">
                            &nbsp;on { new Date(post.timestamp).toDateString() } { new Date(post.timestamp).toLocaleTimeString() }
                            </span>
                        </div>

                        <Link to={linkTo} className={ linkClass }>
                            { post.category &&
                                <span>
                                    <span className="post-category">{capitalize(post.category)}:</span> <span className="post-title">{post.title}</span>
                                </span>
                            }

                            <div className="post-body">{post.body}</div>
                        </Link>

                        <Vote post={post} />

                        <div>
                            {detailView && <div>
                                <div className="post-add-reply-txt" onClick={this.addReplyClicked}> <span><FaComment size={20} /></span> <span className="post-add-reply-txt-link">Add a comment</span></div>

                                {displayAddCommentForm &&
                                <CommentForm parentId={post.id} formCompleted={ this.addReplyClicked }  />}

                            </div>}
                        </div>

                        <Link to={linkTo} className={ linkClass }>
                            <span className="post-reply-txt">Comments ({myComments.length})</span>
                        </Link>

                        {detailView && myComments.map(comment => (
                            <Comment
                            key={ comment.id }
                            post={ comment }
                            editClicked={ this.commentEditClicked }
                            displayForm={ displayEditCommentForm===comment.id } />
                        ))}

                    </div>
                }

            </div>
        )
    }
}

function mapStateToProps ({ comments }) {
    return { comments };
}

export default withRouter(connect(
    mapStateToProps
)(Post))