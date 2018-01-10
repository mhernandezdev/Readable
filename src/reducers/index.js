import { combineReducers } from 'redux'

import {
    FETCH_CATEGORIES,
    FETCH_POSTS,
    DELETE_POST,
    FETCH_COMMENTS,
    ADD_COMMENT,
    DELETE_COMMENT,
    UPDATE_VOTE,
    SET_CATEGORY,
    SET_PREVIOUS,
} from '../actions'


function posts (state = {}, { type, data }) {
    console.log('type', type, 'data', data)
    switch (type) {
        case FETCH_POSTS :
            // convert array to obj
            return data.reduce((obj, item) => {
                obj[item.id] = item
                return obj
            }, [...state]);

        case FETCH_COMMENTS :
            if(data && data[0] && data[0].parentId){
                return {
                    ...state,
                    [data[0].parentId]: {
                        ...state[data[0].parentId],
                      comments: data
                    }
                }
            }else{
                return state
            }
        case ADD_COMMENT:
            return {
                ...state,
                [data.parentId]: {
                    ...state[data.parentId],
                  comments: [data, ...state[data.parentId]['comments']]
                }
            }
        case DELETE_COMMENT:
            console.log("DELETE_COMMENT")
            return state

        case UPDATE_VOTE:
            return {
                ...state,
                [data.id]:{
                    ...state[data.id],
                    voteScore:data.voteScore
                }
            }

        case DELETE_POST:
            return state

        default :
            return state
    }
}

/*function comments (state = {}, { type, data }) {
    switch (type) {
        case FETCH_COMMENTS :

            console.log('FETCH_COMMENTS >>>>>---- ', data, {
                ...state,
                [data.parentId]: {
                  data
                }
            })
            return {
                ...state,
                [data.parentId]: {
                  data
                }
            }
        default :
            return state
    }
}*/
const initialCatState = [{name:'all', pathabs:'/'}];
function categories (state = [], { type, data }){
    switch (type) {
        case FETCH_CATEGORIES :
            return [...initialCatState, ...data.categories]
        default :
          return state
      }
}

/*function category (state = 'all', action){
    switch (action.type) {
        case SET_CATEGORY :
            const { category } = action
            return category;
        default :
          return state
      }
}*/

function previous(state = {pathname: '/'}, action){
    switch (action.type) {
        case SET_PREVIOUS :
            const { pathname } = action
            return {
                pathname: pathname,
            }
        default :
          return state
      }

}

export default combineReducers({
    posts,
    categories,
    /*category,*/
    previous,
})