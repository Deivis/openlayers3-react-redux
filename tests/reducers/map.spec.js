import map from '../../public/reducers/map';

import { SELECT_PLACE, CHANGE_PLACES_VISIBILITY } from '../../public/constants';

const setup = () => {
  const places = [{
                    properties:{
                      name: "Lab for Spatial Informatics",
                      time: "2011-08-22"
                    },
                    geometry: {
                      type: "Point",
                      coordinates: [ 78.3503, 17.4454 ]
                    }
                  }];

  const initialState = {
    map: null, // Ol map reference
    selectedIndex: null,
    places: places
  };

  return {
    initialState,
    places
  };
};

describe('Map reducer: ', () => {
  const { initialState, places } = setup();

  //it('Should change the visibilite of the places', () =>{
  // I don't now how i will do this
  //});

  it('Should change the selected place index ', () =>{
    const expectedState = {
      map: null,
      selectedIndex: 0,
      places: places
    };

    const action = {
      type: SELECT_PLACE,
      featureIndex: 0
    };

    const state = map(initialState, action);

    expect(state).not.toEqual(initialState);

    expect(state).toEqual(expectedState);
  });

});
