import {
    GET_COUNTRIES,
    GET_FIELDS
} from '../actions/types'

const INTIAL_STATE = {};

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload
            };
        case GET_FIELDS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}
