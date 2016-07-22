import React, { Component, PropTypes } from 'react';

// this import create's a bug in the test suit
import ol from 'openlayers';

class Map extends Component{
  componentDidMount() {
    // here the ol3 map will be created
  }

  shouldComponentUpdate() {
    // here the ol3 map will be updated
  }

  render(){
    return(
      <div>MAPA</div>
    );
  }
};

Map.propTypes = {

}

export default Map;
