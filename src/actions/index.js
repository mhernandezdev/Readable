import fetch from 'cross-fetch'

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const SET_CATEGORY = 'SET_CATEGORY'

export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_POST = 'FETCH_POST'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'

export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export const FETCH_COMMENT = 'FETCH_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export const UPDATE_VOTE = 'UPDATE_VOTE'

export const SET_PREVIOUS = 'SET_PREVIOUS'

const token = localStorage.token || Math.random().toString(36).substr(-8);
const API = 'http://localhost:3001'
const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

function fetchFromAPI(url, type, completed){
    return dispatch => fetch(url, {
        method: 'GET',
        headers: { ...headers }
        })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type:`FETCH_${type.toUpperCase()}`,
                data
            })
            completed && completed(data);
        })
}

export function fetchCategories(){
    return fetchFromAPI(`${API}/categories`, "categories");
}

export function fetchPosts(){
    /*return dispatch => fetchFromAPI(`${API}/posts`, "posts", data => data.map(post => {
        console.log('I am calLLLLLLLLED')
        dispatch(fetchComments(post.id))
    }));*/

    return dispatch => fetch(`${API}/posts`, {
        method: 'GET',
        headers: { ...headers }
        })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type:`FETCH_POSTS`,
                data
            })
            data.map(post =>
                dispatch(fetchComments(post.id))
            )
        })

}

export function fetchPost(id){
    return {
        type: FETCH_POST,
    }
}

export function fetchComments(id){
    return fetchFromAPI(`${API}/posts/${id}/comments`, "comments");
}

export function fetchComment(id){
    return {
        type: FETCH_COMMENT,
    }
}

export function addPost ({id}) {
    return {
      type: ADD_COMMENT,

    }
}

export function addComment (comment) {
    return dispatch => fetch(`${API}/comments`, {
        method: 'POST',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
        })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type:`ADD_COMMENT`,
                data
            })
        })
}

export function updateVote ({ id, option }) {
    return dispatch => fetch(`${API}/posts/${id}`, {
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
                type:`UPDATE_VOTE`,
                data
            })
        })
}

export function setCategory (category) {
    return {
        type: SET_CATEGORY,
        category
    }
}

export function setPrevious ({ pathname }) {
    return {
        type: SET_PREVIOUS,
        pathname
    }
}