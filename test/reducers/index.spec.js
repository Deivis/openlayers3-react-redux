import expect  from 'expect';

import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';

import map from '../../public/reducers/map';

import menu from '../../public/reducers/menu';

import rootReducer from '../../public/reducers/index';

describe('combiner reducer', () => {
  const combinedReducers = combineReducers({map, menu, routing: routerReducer});

	it('shoud the combination of all reducer return a new reducer', () => {

		expect(combinedReducers).toExist();
	});

	it('shoud the combination of all reducer be a function', () => {

		expect(combinedReducers).toBeAn('function');
	});

  it('shoud the combination of all reducer be equal to rootReducer', () => {

    expect(combinedReducers).toEqual(rootReducer);
  });

  it('shoud the combination of all reducer return the same result then rootReducer with the same params', () => {
    const result = combinedReducers({},{type: 'XUXU'});
    const rootResult = rootReducer({},{type: 'XUXU'});

    expect(result).toEqual(rootResult);
  });

});
