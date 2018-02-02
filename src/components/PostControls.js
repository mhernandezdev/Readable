import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { deletePost } from '../actions/APIActions'

Modal.setAppElement('#root')

class PostControls extends Component {
    static defaultProps = {
        onEdit: () => '',
        onDeleted: () => '',
    }

    state = {
        menuOpen: false,
        deleteModalOpen:false
    }

    deleteClicked = () => {
        this.setState((prevState) => { return { deleteModalOpen: !prevState.deleteModalOpen }});
    }

    deleteYes = () => {
        // if yes // calls back button //calls action
        const { post } = this.props;
        this.props.deletePost({ type:post.parentId ? 'comments' : 'posts' , id:post.id, parentId:post.parentId });
        this.setState({ deleteModalOpen: false });

        this.props.onDeleted();
    }

    render() {
        const { onEdit } = this.props;
        const { menuOpen, deleteModalOpen } = this.state;

        return (
            <div className="post-menu">

                <div className={`post-menu-flyout ${menuOpen ? 'OPENED' : ''}`} >
                    <div className="post-control-btn" onClick={ onEdit }> Edit </div>
                    <div className="post-control-btn" onClick={ this.deleteClicked }> Delete </div>
                </div>

                <Modal
                className='modal'
                overlayClassName='overlay'
                isOpen={deleteModalOpen}
                onRequestClose={this.deleteModalClose}
                contentLabel='Modal'
                >
                    <div>
                        <p>Are you sure you want to delete?</p>
                        <div className="button" onClick={ this.deleteClicked }>No</div>
                        <div className="button" onClick={ this.deleteYes }>Yes, delete.</div>
                    </div>
                </Modal>
            </div>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ deletePost }, dispatch);
}

export default connect(null, mapDispatchToProps)(PostControls);
