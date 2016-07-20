import expect  from 'expect';

import { combineReducers } from 'redux';

import map from '../../public/reducers/map';

import menu from '../../public/reducers/menu';

import rootReducer from '../../public/reducers/index';

describe('Combiner reducer: ', () => {
  const combinedReducers = combineReducers({map, menu});

	it('Should the combination of all reducer return a new reducer', () => {

		expect(combinedReducers).toExist();
	});

	it('Should the combination of all reducer be a function', () => {

		expect(combinedReducers).toBeAn('function');
	});

  it('Should the combination of all reducer be equal to rootReducer', () => {

    expect(combinedReducers).toEqual(rootReducer);
  });

  it('Should the combination of all reducer return the same result then rootReducer with the same params', () => {
    const result = combinedReducers({},{type: 'XUXU'});
    const rootResult = rootReducer({},{type: 'XUXU'});

    expect(result).toEqual(rootResult);
  });

});
