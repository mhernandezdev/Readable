import fetch from 'cross-fetch'

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const SELECTED_CATEGORY = 'SELECTED_CATEGORY'

export const FETCH_POSTS = 'FETCH_POSTS'
export const UPDATE_POSTS = 'UPDATE_POSTS'
export const ADD_POSTS = 'ADD_POSTS'
export const DELETE_POSTS = 'DELETE_POSTS'
export const UPDATE_VOTE_POSTS = 'UPDATE_VOTE_POSTS'

export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export const UPDATE_COMMENTS = 'UPDATE_COMMENTS'
export const ADD_COMMENTS = 'ADD_COMMENTS'
export const DELETE_COMMENTS = 'DELETE_COMMENTS'
export const UPDATE_VOTE_COMMENTS = 'UPDATE_VOTE_COMMENTS'

const token = localStorage.token || Math.random().toString(36).substr(-8);
const API = 'http://localhost:3001'
const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

export function fetchCategories(){
    return dispatch => fetch(`${API}/categories`, {
        method: 'GET',
        headers: { ...headers }
        })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type:`FETCH_CATEGORIES`,
                data
            })
        })
}
export function setSelectedCategory (category) {
    return {
        type: SELECTED_CATEGORY,
        data:category
    }
}

export function fetchPosts(){
    return dispatch => fetch(`${API}/posts`, {
        method: 'GET',
        headers: { ...headers }
        })
        .then(res => res.json())
        .then(data => {
            data.map(post => {
                dispatch({
                    type:`REQUEST_COMMENTS`,
                    data: { parentId:post.id }
                })
                return dispatch(fetchComments(post.id));
            })

            dispatch({
                type:`FETCH_POSTS`,
                data
            })
        })
}

export function updatePost({type, body, id}){
    return dispatch => fetch(`${API}/${type}/${id}`, {
        method: 'PUT',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type:`UPDATE_${type.toUpperCase()}`,
                data
            })
        })
}

export function addPost ({type, body}) {
    return dispatch => fetch(`${API}/${type}`, {
        method: 'POST',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type:`ADD_${type.toUpperCase()}`,
                data
            })
        })
}

export function deletePost({type, id, parentId }){
    return dispatch => fetch(`${API}/${ type }/${id}`, {
        method: 'DELETE',
        headers: { ...headers }
        })
        .then(() => {
            dispatch({
                type:`DELETE_${ type.toUpperCase() }`,
                data:{
                    id,
                    parentId
                }
            })
        })
}

export function fetchComments(id){
    return dispatch => fetch(`${API}/posts/${id}/comments`, {
        method: 'GET',
        headers: { ...headers }
        })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type:`FETCH_COMMENTS`,
                data:{ parentId:id, results:data }
            })
        })
}

export function updateVote ({ type, id, option }) {
    return dispatch => fetch(`${API}/${type}/${id}`, {
        method: 'POST',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, option })
        })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type:`UPDATE_VOTE_${type.toUpperCase()}`,
                data
            })
        })
}
