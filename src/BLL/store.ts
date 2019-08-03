import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import todolistReducer from "./todoReducer";
import {reducer as formReducer} from 'redux-form';


const reducers = combineReducers({
   todo: todolistReducer,
   form: formReducer
});

const store = createStore(reducers,applyMiddleware(thunk));

export default store;