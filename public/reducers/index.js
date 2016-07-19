import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';

import map from './map';

import menu from './menu';

//Here we use the combineReducers method to create the "master" reducer
const rootReducer = combineReducers({ map, menu, routing: routerReducer });

export default rootReducer;
