import React from 'react'
import Comment from './Comment'

const PostList = ({ posts }) => (
    <div>
        {posts && posts.map(post => (
            <Comment key={post.id} post={post}></Comment>
        ))}
    </div>
)

export default PostList