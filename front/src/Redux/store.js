import { createStore, combineReducers } from 'redux';
import { LogInReducer } from './reducer';
import { getDataReducer } from "../Redux/DataApi/reducer";
const rootReducer = combineReducers({
    login: LogInReducer,
    getDataReducer
})

export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())