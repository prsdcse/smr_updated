import { combineReducers } from 'redux';
import navReducer from "./navReducer";
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    nav: navReducer,
    form: formReducer
})

export default rootReducer;