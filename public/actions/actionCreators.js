import * as constants from '../constants';

const selectPlace = (place) =>({
  type: constants.SELECT_PLACE,
  place
});

export const unselectPlace = () =>{
  return (dispatch, getState) => {
    
    return dispatch(selectPlace(null));
  };
};

const shouldChangePlace = (state,place) => {
  if(!state.selected){
    return true;
  };
  return state.selected.name !== place.name;
};

const getPlaceName = (featureProps) => ( featureProps.name.replace(/<(?:.|\n)*?>/g, '') );

export const changeSelectedPlace = (place) => {

  return (dispatch, getState) => {
    if(shouldChangePlace(getState(), place)){
      let state = getState();

      let popup = state.map.olPopup;

      let placeLayer = getLayerById(state.map.olMap, 'placeLayer');

      let selectedFeature = placeLayer.getSource().getFeatures().filter(function(feature) {

        return place.name == getPlaceName(feature.getProperties());
      });

      selectedFeature = selectedFeature[0];

      popup.getElement().innerHTML = place.name;

      popup.setPosition(selectedFeature.getGeometry().getFirstCoordinate());

      state.map.olMap.getView().setZoom(state.map.defaultZoom || 4);

      return dispatch(selectPlace(place));
    };

    return;
  };
};

const updateMapReference = (olMap) =>({
  type: constants.UPDATE_MAP_REFERENCE,
  olMap
});

const updatePlaces = (places) =>({
  type: constants.UPDATE_PLACES,
  places
});

const shouldUpdateMapReference = (state, olMap) => {
  //TODO: Find a better validation using the map reference
  return !state.olMap;
};

export const updateMapReferenceIfNeeded = (olMap) => {

  return (dispatch, getState) => {
    if(shouldUpdateMapReference(getState(), olMap)){

      return dispatch(updateMapReference(olMap));
    };

    return;
  };
};

export const updatePlacesList = (event) => {

  return (dispatch, getState) => {
    const state = getState();

    const map = state.map.olMap;

    if(state.menu && state.menu.places && state.menu.places.length){
      map.unByKey(event);

      return;
    } else {

      let placeLayer = getLayerById(map, 'placeLayer');

      let places = getPlacesFromLayer(placeLayer);

      return dispatch(updatePlaces(places));
    };
  };
};

const getPlacesFromLayer = (placeLayer) => {
  const source = placeLayer.getSource();

  const places = source.getFeatures().map(function(feature) {
    let properties = feature.getProperties();

    return {
      name: getPlaceName(properties),
      time: properties.time
    };
  });

  return places;
};

const getLayerById = (olMap,layerId) => {
  let layer;
  olMap
    .getLayers()
    .forEach(function (lyr) {
      if (layerId == lyr.get('id')) {
        layer = lyr;
      };
    });

  return layer;
};

const updatePopupReference = (olPopup) =>({
  type: constants.UPDATE_POPUP_REFERENCE,
  olPopup
});

export const updatePopupReferenceIfNeeded = (olPopup) => {

  return (dispatch, getState) => {
    const state = getState();

    if(!state.map.olPopup){

      return dispatch(updatePopupReference(olPopup));
    };

    return;
  };
};
