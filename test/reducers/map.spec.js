import expect  from 'expect';

import cjson from 'cjson';

import path from 'path';

import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';

import map from '../../public/reducers/map';

import { SELECT_PLACE, CHANGE_PLACES_VISIBILITY } from '../../public/constants';

const setup = () =>{
  const initialState = {
    map: null, // Ol map reference
    selected: {},
    places: []
  };

  const rootDir = process.cwd();

  const geoJSON = cjson.load(path.join(rootDir, '/public/data/OSGEoLabs.json'));

  initialState.places = geoJSON.features.map(function(feature) {

    return feature.properties;
  })

  return {
    initialState,
    geoJSON
  };
};

describe('Map reducer: ', () => {
  const { initialState, geoJSON } = setup();

  it('Should change the visibilite of the places', () =>{

  });

  it('Should change the selected place', () =>{
    const expectedState = {
      map: null,
      selected:geoJSON.features[0],
      places: geoJSON.features
    };

    const action = {
      type: SELECT_PLACE,
      featureIndex: 0
    };

    expect(map(initialState, action)).toNotEqual(initialState);

    expect(map(initialState, action)).toEqual(expectedState);

  });

});
