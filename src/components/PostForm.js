import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost, updatePost } from '../actions'

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
        type:'comments',
        mode:'edit'
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

        const { type, mode, post } = this.props;
        const { id, parentId } = post;
        const { category, author, title, body } = this.state;

        // some validation
        this.setState({ authorFail:author==='', titleFail:title==='', bodyFail:body==='' });
        if(author!=='' && !body!=='' && (type!=='posts' || title!=='')){
            // format body info
            const data = {
                category,
                parentId,
                id,
                author,
                title,
                body,
                timestamp: Date.now(),
            }
            //console.log('mode', mode, 'data',data)

            this.props[(mode==='edit' && 'updatePost') || 'addPost']({ type:type, body:data, id:id });

            this.props.edit();
        }
    }

    render() {
        const { type, categories } = this.props;
        const { category, author, title, body, authorFail, titleFail, bodyFail } = this.state;

        return (
            <div className="post-add-comment">

                    <form onSubmit={this.handlePost}>

                        {type==='posts' && <select className="" value={category} onChange={(e) => this.categoriesChange(e)}>
                            {categories.map(c => (c.name!=='all' &&
                                <option key={c.name} value={c.name}>{c.name}</option>
                            ))}
                        </select>}

                        <input
                        type="text"
                        autoFocus placeholder="Author"
                        name="author"
                        value={ author }
                        onChange={ this.handleTextChange }
                        className={ authorFail ? 'FAIL' : '' }
                        />

                        {type==='posts' && <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={ title }
                        onChange={ this.handleTextChange }
                        className={ titleFail ? 'FAIL' : '' }
                        />
                        }

                        <textarea
                        placeholder="Comment"
                        name="body"
                        value={ body }
                        onChange={ this.handleTextChange }
                        className={ bodyFail ? 'FAIL' : '' }
                        />


                        <div className="button" onClick={() => this.props.edit()}>Cancel</div>
                        <button type="submit">Post</button>
                    </form>

            </div>
        )
    }
}

function mapStateToProps({ categories }) {
    return { categories }
}
function mapDispatchToProps (dispatch) {
    return {
        addPost: (data) => dispatch(addPost(data)),
        updatePost: (data) => dispatch(updatePost(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);

