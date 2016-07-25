import React from 'react';

import TestUtils from 'react-addons-test-utils';

import { createStore } from 'redux';

import { Provider } from 'react-redux';

import App from '../../public/components/App';

import Main from '../../public/components/Main';

import rootReducer from '../../public/reducers/index';

const setup = () => {

  const places = [{
                    name: "Lab for Spatial Informatics",
                    time: "2011-08-22"
                  }];

  const initialState = {
    map: {
      selected: {},
      places: places
    }
  };

  const store = createStore(rootReducer, initialState);

	const props = store;

  let renderer = TestUtils.createRenderer();

	renderer.render(<Provider store={store}>
									  <App />
									</Provider>);

  let component = renderer.getRenderOutput();

  return {
    props,
    renderer,
    component
  };
}

describe('App connector component: ', () => {

  const { component } = setup();

  it('Should render correctly an App component', () => {

		expect(component).toBeDefined();
		expect(component.type.displayName).toEqual('Connect(Main)');
	});

  it('Should wrap a Main component', () => {

		let MainComponent =  component.type.WrappedComponent;

		expect(MainComponent).toEqual(Main);
	});

});
