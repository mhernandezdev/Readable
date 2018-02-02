import {
    FETCH_CATEGORIES,
    SELECTED_CATEGORY,

    FETCH_POSTS,
    UPDATE_POSTS,
    ADD_POSTS,
    DELETE_POSTS,
    UPDATE_VOTE_POSTS,

    REQUEST_COMMENTS,
    FETCH_COMMENTS,
    ADD_COMMENTS,
    UPDATE_COMMENTS,
    DELETE_COMMENTS,
    UPDATE_VOTE_COMMENTS

} from '../actions/APIActions'


export function posts (state = {}, { type, data }) {
    switch (type) {
        case FETCH_POSTS :
            // convert array to obj
           return data.reduce((obj, item) => {
                obj[item.id] = item
                return obj
            }, {...state});

        case ADD_POSTS :
        case UPDATE_POSTS:
            return { ...state, [data.id]:data }

        case DELETE_POSTS: {
            const { [data.id]:value, ...newState } = state
            return newState
        }
        case UPDATE_VOTE_POSTS:
            return {
                ...state,
                [data.id]:{
                    ...state[data.id],
                    voteScore:data.voteScore
                }
            }

        default :
            return state
    }
}

export function comments (state = {}, { type, data }) {
    switch (type) {
        case FETCH_COMMENTS : {
            // convert array to obj
            const results = data.results;
            const obj =  results.reduce((obj, item) => {
                obj[item.id] = item
                return obj
            }, {});
            return {...state, ...obj }
        }
        case ADD_COMMENTS:
        case UPDATE_COMMENTS:
            return { ...state, [data.id]:data }

        case DELETE_COMMENTS: {
            const { [data.id]:value, ...newState } = state
            return newState
        }
        case UPDATE_VOTE_COMMENTS:
            return {
                ...state,
                [data.id]:{
                    ...state[data.id],
                    voteScore:data.voteScore
                }
            }

        default :
            return state
    }
}

export function categories (state = {selected:'all', names:[ {name:'all', pathabs:'/'} ]}, { type, data }){

    switch (type) {
        case FETCH_CATEGORIES :
            return {...state, names:[...state.names, ...data.categories] }

        case SELECTED_CATEGORY :
        console.log('categories', data)
            return {...state, selected:data }

        default :
          return state
    }
}

const initialLoadState = { post:false, categories:false, comments:false, commentsObj:{}};
export function loaded(state = initialLoadState, {type, data}){
    switch (type) {
        case FETCH_POSTS :
            return { ...state, posts:true }

        case FETCH_CATEGORIES :
            return { ...state, categories:true }

        case REQUEST_COMMENTS :
            return { ...state,
                commentsObj:{
                    ...state.commentsObj,
                    [data.parentId]:false
                }
            }

        case FETCH_COMMENTS : {
            let newState =  { ...state,
                commentsObj:{
                    ...state.commentsObj,
                    [data.parentId]:true
                }
            }

            // are all comment request completed
            const commentsArray = Object.values(newState.commentsObj).filter(b => !b);
            newState.comments = commentsArray.length===0;
            return newState
        }

        default :
            return state
    }
}
