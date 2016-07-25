
import * as actions from '../../public/actions/actionCreators';

import * as constants from '../../public/constants';

describe('Action creators: ', () => {

  it('Should return a new state with the index of the selected place', () => {

    const index = 0;

    const expectedState = {
      type: constants.SELECT_PLACE,
      index
    };

    expect(actions.selectPlace(index)).toEqual(expectedState);

  });

});
