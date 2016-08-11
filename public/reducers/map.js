import { UPDATE_MAP_REFERENCE, UPDATE_POPUP_REFERENCE } from '../constants';

const map = (state = {}, action) => {

  if(!action){

    return state;
  };
  let out;
  switch (action.type) {

    case UPDATE_MAP_REFERENCE:
      out = Object.assign({},state);

      out.olMap = action.olMap;

      out.defaultZoom = out.olMap.getView().getZoom();

      return out;
    case UPDATE_POPUP_REFERENCE:
      out = Object.assign({},state);

      out.olPopup = action.olPopup;

      out.popupElement = action.popupElement;

      return out;
    default:

      return state;
  };

};

export default map;
