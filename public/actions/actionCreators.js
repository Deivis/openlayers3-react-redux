import * as constants from '../constants';

export const selectPlace = (index) =>({
  type: constants.SELECT_PLACE,
  index
});
