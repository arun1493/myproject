
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form'

const rootReducer = combineReducers({
    routing,
    form:  reduxFormReducer.plugin({
        productsForm: (state, action) => {
            return state;
        }
    }),
});

export default rootReducer;