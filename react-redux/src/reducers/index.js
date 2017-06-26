import { combineReducers } from 'redux';
import readingusers from './readingusers';
import pagination from './pagination';

const reducers = combineReducers({
    readingusers,pagination
});

export default reducers