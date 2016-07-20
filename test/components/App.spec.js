import expect  from 'expect';

import jsdomify from 'jsdomify';

import cjson from 'cjson';

import path from 'path';

import React from 'react';

import TestUtils from 'react-addons-test-utils';

import { createStore } from 'redux';

import { Provider } from 'react-redux';

import App from '../../public/components/App';

import Main from '../../public/components/Main';

import rootReducer from '../../public/reducers/index';

const setup = () => {
  const initialState = {
    map: {
      selected: {},
      places: []
    }
  };

  jsdomify.create();

  const rootDir = process.cwd();

  const geoJSON = cjson.load(path.join(rootDir, '/public/data/OSGEoLabs.json'));

  const places =  geoJSON.features.map(function(feature) {

    return feature.properties;
  });

  initialState.places = [places[0]];

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

		expect(component).toExist();
		expect(component.type.displayName).toEqual('Connect(Main)');
	});

  it('Should wrap a Main component', () => {
		let MainComponent =  component.type.WrappedComponent;

		expect(MainComponent).toEqual(Main);
	});

});
