import { combineReducers } from 'redux';

import customMatchers , { addMatcher } from '../customMatchers';

import map from '../../public/reducers/map';

import menu from '../../public/reducers/menu';

import rootReducer from '../../public/reducers/index.js';

describe('Combiner reducer: ', () => {
  const combinedReducers = combineReducers({map, menu});

  beforeEach(function() {
    
    addMatcher(customMatchers.toEqualFunction);
  });

	it('Should the combination of all reducer return a new reducer', () => {

		expect(combinedReducers).toBeDefined();
	});

	it('Should the combination of all reducer be a function', () => {

		expect(typeof combinedReducers).toBe('function');
	});

  it('Should the combination of all reducer be equal to rootReducer', () => {

    expect(combinedReducers).toEqualFunction(rootReducer);
  });

  it('Should the combination of all reducer return the same result then rootReducer with the same params', () => {
    const result = combinedReducers({},{type: 'XUXU'});

    const rootResult = rootReducer({},{type: 'XUXU'});

    expect(result).toEqual(rootResult);
  });

});
