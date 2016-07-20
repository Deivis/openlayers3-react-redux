import expect  from 'expect';

import React from 'react';

import TestUtils from 'react-addons-test-utils';

import { createStore } from 'redux';

import { Provider } from 'react-redux';

import Map from '../../public/components/Map';

import rootReducer from '../../public/reducers/index';

const setup = () =>{
  const initialState = {
    map: {
      selected: {},
      places: []
    }
  };

  const store = createStore(rootReducer, initialState);

  const props = store;

  let renderer = TestUtils.createRenderer();

  renderer.render(<Map {...props}/>);

  let component = renderer.getRenderOutput();

  return {
    props,
    renderer,
    component
  };
};

describe('Map component: ', () => {
  const { props, renderer, component } = setup();

  it('Should render correctly a div in Map component', () => {

    expect(component).toExist();

    expect(component.type).toEqual('div');
	});

});
