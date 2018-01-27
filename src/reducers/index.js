import { combineReducers } from 'redux'

import  { posts, comments, categories, loaded } from './APIReducers'
import sort from './sortonReducers'

export default combineReducers({
    posts,
    comments,
    categories,
    loaded,
    sort
})