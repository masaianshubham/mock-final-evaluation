import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import authReducer from "./AuthReducer/reducer";
import docReducer from "./DocReducer/reducer"
import thunk from "redux-thunk";

const rootReducer = combineReducers({ auth: authReducer, doc: docReducer });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);