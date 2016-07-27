import { UPDATE_PLACES, SELECT_PLACE } from '../constants';

const menu = (state = {}, action) => {

  if(!action){

    return state;
  }

  switch (action.type) {
    case SELECT_PLACE:
      return Object.assign(
        {},
        state,
        {
          selected: action.place
        }
      );
    case UPDATE_PLACES:

      return Object.assign(
        {},
        state,
        {
          places: action.places
        }
      );
    default:

      return state;
  };

};

export default menu;
