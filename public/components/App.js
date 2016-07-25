import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import Main from './Main';

import * as actionCreators from '../actions/actionCreators';

const mapStateToProps = (state) =>({
  map: state.map,
  selectedIndex: state.selectedIndex,
  places: state.places
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators,dispatch);

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
