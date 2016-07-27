import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import Main from './Main';

import * as actionCreators from '../actions/actionCreators';

const mapStateToProps = (state) =>{
  return {
    olMap: state.map.olMap || null,
    selected: state.menu.selected || null,
    places: state.menu.places || []
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators,dispatch);

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
