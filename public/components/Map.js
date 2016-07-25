import React, { Component, PropTypes } from 'react';

// this import create's a bug in the test suit
import ol from 'openlayers';

class Map extends Component{
  componentDidMount() {
    const map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: [949282, 6002552],
        zoom: 4
      })
    });
  }

  shouldComponentUpdate() {
    // here the ol3 map will be updated
  }

  render(){
    return(
      <div id="map">MAPA</div>
    );
  }
};

Map.propTypes = {

}

export default Map;
