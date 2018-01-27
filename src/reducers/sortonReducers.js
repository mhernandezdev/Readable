import {
    SORT
} from '../actions/sortonActions'

export default function sort(state = 'newest', {type, on}){
    switch (type) {
        case SORT :
            return on
        default :
            return state
    }
}
