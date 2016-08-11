import * as constants from '../constants';

const selectPlace = (place) =>({
  type: constants.SELECT_PLACE,
  place
});

/* unselect a place in the map and in the menu,
* close the place popup and change the selected place to null
*/
export const unselectPlace = () =>{
  return (dispatch, getState) => {
    let state = getState();

    let { olMap, olPopup} = state.map;

    // hide/close the ol popup
    olPopup.setPosition();

    olMap.selectSingleClick.getFeatures().clear();

    return dispatch(selectPlace(null));
  };
};

// validates if is required to change the selected place
const shouldChangePlace = (state,place) => {
  if(!state.selected){
    return true;
  };
  return state.selected.name !== place.name;
};

// get the name of a place from a feature
const getPlaceName = (featureProps) => ( featureProps.name.replace(/<(?:.|\n)*?>/g, '') );

// Shows the olPopup in the map with the data from the selected feature
const showOlPopup = (map, defaultZoom, popup, selectedFeature) =>{
  let innerPopup = popup.getElement().querySelector('#innerPopup');

  innerPopup.innerHTML = selectedFeature.getProperties().name;

  popup.setPosition(selectedFeature.getGeometry().getFirstCoordinate());

  map.getView().setZoom(defaultZoom || 4);
}

/*Receives the select feature event from the mapm, dispatch correctly the
* select place action and shows the olPopup with the selected feature data
*/
export const selectFeature = (event) =>{

  return (dispatch, getState) => {
    let state = getState();

    let selectedFeature = event && event.selected ? event.selected[0]: event;

    let props = selectedFeature.getProperties();

    let { olPopup, olMap, defaultZoom } = state.map;

    let place = {
      name: getPlaceName(props),
      time: props.time
    };

    showOlPopup(olMap, defaultZoom, olPopup, selectedFeature);

    return dispatch(selectPlace(place));
  };
};

/* Receives the place which will be selected and based on the place name
* select a feature on the map and dispatch the select place action
*/
export const changeSelectedPlace = (place) => {

  return (dispatch, getState) => {
    if(shouldChangePlace(getState(), place)){
      let state = getState();

          let { olPopup, olMap, defaultZoom } = state.map;

      let placeLayer = getLayerById(olMap, 'placeLayer');

      let selectedFeature = placeLayer.getSource().getFeatures().filter(function(feature) {

        return place.name == getPlaceName(feature.getProperties());
      });

      selectedFeature = selectedFeature[0];

      olMap.selectSingleClick.getFeatures().clear();

      olMap.selectSingleClick.getFeatures().push(selectedFeature);

      showOlPopup(olMap, defaultZoom, olPopup, selectedFeature);

      return dispatch(selectPlace(place));
    };

    return;
  };
};

// update the reference to the openlayers map object
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

// updates the ol map object if it not exist
export const updateMapReferenceIfNeeded = (olMap) => {

  return (dispatch, getState) => {
    if(shouldUpdateMapReference(getState(), olMap)){

      return dispatch(updateMapReference(olMap));
    };

    return;
  };
};

/* Receives the event postrender from the openlayers map and with the map
* features create the list of places used in the menu component.
* In the end returns the dispatch of action updatePlaces.
*/
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

//Creates a place list from a feature list(from placeLayer)
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

// Receives an olMap reference and the layer id and return the layer object
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

// updates the map popup reference if it not exist
export const updatePopupReferenceIfNeeded = (olPopup) => {

  return (dispatch, getState) => {
    const state = getState();

    if(!state.map.olPopup){

      return dispatch(updatePopupReference(olPopup));
    };

    return;
  };
};
