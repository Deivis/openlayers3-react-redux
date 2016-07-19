import expect  from 'expect';

import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';

import map from '../../public/reducers/map';

import menu from '../../public/reducers/menu';

import roorReducer from '../../public/reducers/index';

describe('combiner reducer', () => {
  const combinedReducers = combineReducers({map, menu, routing: routerReducer});

	it('shoud the combination of all reducer return a new reducer', () => {

		expect(combinedReducers).toExist();
	});

	it('shoud the combination of all reducer be a function', () => {

		expect(combinedReducers).toBeAn('function');
	});

});
