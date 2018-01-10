import React from 'react'
import { capitalize } from '../utils/helpers'
import { Link } from 'react-router-dom'
import Vote from './Vote'
import Reply from './Reply'
import TiUser from 'react-icons/lib/ti/user'
import MdMoreVert from 'react-icons/lib/md/more-vert'

const Comment = ({ post, category, id }) => {

    // link based on URL
    let linkTo = `/${category}/post/${post.id}`;
    if(id){
        linkTo = (post.parentId && `/${category}/post/${post.parentId}/${post.id}`);
    }

    return (
        <div className={`post ${(post.parentId && 'post-comment') || 'post-root'}`}>

            <Link to={linkTo} className='post-link'>
                <div className="post-user-icon">
                    <TiUser size={20} />
                </div>

                <div>
                    <span className="post-author">{post.author}</span>
                    <span className="post-date">
                    &nbsp;on { new Date(post.timestamp).toDateString() } { new Date(post.timestamp).toLocaleTimeString() }
                    </span>

                    <div className="post-more-icon"><MdMoreVert size={20} /></div>
                </div>

                { post.category &&
                    <span>
                        <span className="post-category">{capitalize(post.category)}:</span> <span className="post-title">{post.title}</span>
                    </span>
                }

                <div className="post-body">{post.body}</div>
            </Link>

            <div><Vote post={post} /></div>

            {!post.parentId &&
                <Reply parentId={post.id}  />
            }


            <div>
                {post.comments && post.comments.map(comment => (
                    <Comment key={comment.id} post={comment} category={category}></Comment>
                ))}
            </div>

        </div>
    )
}

export default Comment