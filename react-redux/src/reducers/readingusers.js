import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    appUsers:[]
}



const readingusers = (state = initialState , action) => {
    switch (action.type) {
        case types.READINGUSERS:
            return {
                appUsers:action.appUsers
            }
        case types.CREATEUSER:
            return {
                appUsers: update(state.appUsers, { $push: [action.userinfo]})
            }
        default:
            return state;
    }
};
export default readingusers