import * as types from '../actions/ActionTypes';

const initialState = {
    activePage:0,
    totalPageNum:0
}


const pagination = (state = initialState , action) => {
    switch (action.type) {
        case types.PAGINATION:
            return{
                activePage: action.pageNum,
                totalPageNum: action.totalPageNum
            }
            
        default:
            return state;
    }
};

export default pagination