import map from '../../public/reducers/map';

import { UPDATE_MAP_REFERENCE, UPDATE_POPUP_REFERENCE } from '../../public/constants';

const setup = () => {
  const initialState = {
    olMap: { getView: () =>({ getZoom: () => 0 }) },
		defaultZoom: 0,
    olPopup: null,
    popupElement: null
  };

  return {
    initialState
  };
};

describe('Map reducer: ', () => {
  const { initialState } = setup();


  it('Should change the openlayers map reference ', () =>{

    const olMap ={
      getView: () => ({ getZoom: () => 1 })
    }

    const expectedState = {
      olMap: olMap,
      defaultZoom: 1,
      olPopup: null,
      popupElement: null
    };

    const action = {
      type: UPDATE_MAP_REFERENCE,
      olMap: olMap
    };

    const state = map(initialState, action);

    expect(state).not.toEqual(initialState);

    expect(state).toEqual(expectedState);
  });

  it('Should change the openlayers map popup reference ', () =>{
    const olPopup = {};

    const popupElement = {};

    const expectedState = Object.assign({}, initialState,{
      olPopup: olPopup,
      popupElement: popupElement
    });

    const action = {
      type: UPDATE_POPUP_REFERENCE,
      olPopup,
      popupElement
    };

    const state = map(initialState, action);

    expect(state).not.toEqual(initialState);

    expect(state).toEqual(expectedState);

  });

});
