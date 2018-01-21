import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deletePost } from '../actions'
import Modal from 'react-modal'
import Post from './Post'
import PostForm from './PostForm'
import FaAngleLeft from 'react-icons/lib/fa/angle-left'

class Detail extends Component {
    static defaultProps = {
        create:false
    }
    state = {
        edit: false,
        deleteModalOpen: false
    }

    post = {};
    linkTo = '/';

    edit(){
        this.setState((prevState) => { return { edit: !prevState.edit } });

        // create fires back
        this.props.create && this.props.history.push(this.linkTo);
    }

    delete(){
        this.setState(() => { return { deleteModalOpen: true } });
    }

    deleteNo(){
        this.setState(() => { return { deleteModalOpen: false } });
    }

    deleteYes(){
        // if yes // calls back button //calls action
        const { id } = this.props.match.params;
        const post = this.post;
        this.props.deletePost({ type:post.parentId ? 'comments' : 'posts' , id:id, parentId:post.parentId });
        this.setState(() => { return { deleteModalOpen: false } });
        this.props.history.push(this.linkTo);
    }

    render() {
        const { posts, comments, create } = this.props;
        const {category, id, parentid} = this.props.match.params;
        const { edit, deleteModalOpen } = this.state;

        // back link
        let linkTo = (category && `/category/${category}`) || `/`;
        if(id && parentid){
            linkTo += `/post/${parentid}`;
        }
        this.linkTo = linkTo;

        //const me = post;
        const me = posts[id] || comments[id];
        const type = me && me.parentId ? 'comments' : 'posts';
        this.post = me;


        return (
            <div className="detail">
                <div className="header-child">
                    {!create && <div className="detail-ui-btns">
                        <div className="button edit-btn" onClick={() => this.edit()} >Edit</div>
                        <div className="button delete-btn" onClick={(e) => this.delete(e)} >Delete</div>
                    </div>}
                    <Link className='close-btn' to={linkTo} >
                        <FaAngleLeft size={30} /> Back
                    </Link>
                </div>

                <div className="main">
                    <h1>{create ? 'Create' : 'Detail'}</h1>

                    {/* form or single comment */}
                    { !edit && me && <Post post={me} category={category} id={id} detail={true}></Post> }
                    { (create || edit) &&
                        <PostForm post={me}
                        type={type}
                        mode={create ? 'new' : 'edit'}
                        edit={() => this.edit()} />
                    }

                </div>

                <Modal
                className='modal'
                overlayClassName='overlay'
                isOpen={deleteModalOpen}
                onRequestClose={this.deleteModalClose}
                appElement={document.getElementById('root')}
                contentLabel='Modal'
                >
                    <div>
                        <p>Are you sure you want to delete?</p>
                        <div className="button" onClick={(e) => this.deleteNo(e)}>No</div>
                        <div className="button" onClick={(e) => this.deleteYes(e)}>Yes, delete.</div>
                    </div>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps({ posts, comments }) {
  return { posts, comments }
}

function mapDispatchToProps (dispatch) {
    return {
        deletePost: (data) => dispatch(deletePost(data)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detail));
