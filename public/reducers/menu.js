const menu = (state = {
  selected: {},
  places: []
}, action) => {

  if(!action){

    return state;
  }

  switch (action.type) {

    default:
      return state;
  };

};

export default menu;
