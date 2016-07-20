import { SELECT_PLACE, CHANGE_PLACES_VISIBILITY } from '../../public/constants';

const map = (state = {
  selected: {},
  places: []
}, action) => {

  if(!action){

    return state;
  }

  switch (action.type) {
    case SELECT_PLACE:

      return Object.assign({},
        state,
        { selected: state.places[action.featureIndex] }
      );

    default:

      return state;
  };

};

export default map;
