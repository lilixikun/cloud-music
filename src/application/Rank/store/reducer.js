import * as actionType from "./constants"
import { fromJS } from "immutable"

const defaultState = fromJS({
    rankList: [],
    loading: true
})

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionType.CHANGE_LOADING:
            return state.set('loading', action.data)
        case actionType.CHANGE_RANK_LIST:
            return state.set('rankList', action.data);
        default:
            return state;
    }
}