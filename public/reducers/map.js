import { SELECT_PLACE, CHANGE_PLACES_VISIBILITY } from '../../public/constants';

const mapa = (state = {}, action) => {

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

export default mapa;
