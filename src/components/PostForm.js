import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { addPost, updatePost } from '../actions/APIActions'

class PostForm extends Component {
    static defaultProps = {
        /* post - seed data for internally-controlled state */
        post: {
            category:'react',
            author:'',
            title:'',
            body:'',
            id: Math.random().toString(36).substr(-8),
            parentId:''
        },
        mode:'new',
        formCompleted:function(){}
    }

    state = {
        category:this.props.post.category,
        author:this.props.post.author,
        title:this.props.post.title,
        body:this.props.post.body,
        authorFail:false,
        titleFail:false,
        bodyFail:false
    }

    categoriesChange= (e) => {
        this.setState({ category: e.target.value });
    }

    handleTextChange = (e) => {
        const {name, value} = e.target;
        this.setState({ [name]: value, [`${name}Fail`]:value==='' });
    }

    handlePost = (e) => {
        e.preventDefault();

        const { mode, post } = this.props;
        const { id } = post;
        const { category, author, title, body } = this.state;

        // some validation
        this.setState({ authorFail:author==='', titleFail:title==='', bodyFail:body==='' });
        if(author!=='' && body!=='' && title!==''){
            // format body info
            const data = {
                category,
                id,
                author,
                title,
                body,
                timestamp: Date.now()
            }

            this.props[(mode==='new' && 'addPost') || 'updatePost']({ type:'posts', body:data, id });

            this.props.formCompleted( true );
        }
    }

    render() {
        const { mode, categories, formCompleted } = this.props;
        const { category, author, title, body, authorFail, titleFail, bodyFail } = this.state;

        return (
            <div className="post-add-comment">

                    <form onSubmit={this.handlePost}>

                        <select className="" value={category} onChange={(e) => this.categoriesChange(e)}>
                            {categories.names.map(c => (c.name!=='all' &&
                                <option key={c.name} value={c.name}>{c.name}</option>
                            ))}
                        </select>

                        <input
                        type="text"
                        autoFocus placeholder="Author"
                        name="author"
                        value={ author }
                        onChange={ this.handleTextChange }
                        className={ authorFail ? 'FAIL' : '' }
                        />

                        <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={ title }
                        onChange={ this.handleTextChange }
                        className={ titleFail ? 'FAIL' : '' }
                        />

                        <textarea
                        placeholder="Content for your post"
                        name="body"
                        value={ body }
                        onChange={ this.handleTextChange }
                        className={ bodyFail ? 'FAIL' : '' }
                        />


                        <div className="button" onClick={() => formCompleted()}>Cancel</div>
                        <button type="submit">{ (mode==='new' && 'Post') || 'Save' }</button>
                    </form>

            </div>
        )
    }
}

function mapStateToProps({ categories }) {
    return { categories }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addPost, updatePost }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);

