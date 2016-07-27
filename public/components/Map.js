import React, { Component, PropTypes } from 'react';

// this import create's a bug in the test suit
import ol from 'openlayers';

class Map extends Component{
  componentDidMount() {
    if(!this.props.olMap){
      this.createOlMap();
    };
  }

  shouldComponentUpdate() {

    return false;
  }

  createOlMap() {
    const placeLayer = new ol.layer.Vector({
      id: 'placeLayer',
      source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        //url: "http://www.geoforall.org/locations/OSGEoLabs.json" raises
        //Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at http://www.geoforall.org/locations/OSGEoLabs.json. (Reason: CORS header 'Access-Control-Allow-Origin' missing).
        url: "public/data/OSGEoLabs.json"
      })
    });

    window.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        placeLayer
      ],
      view: new ol.View({
        center: [949282, 6002552],
        zoom: 4
      })
    });

    const popupElement = this.refs.popup;

    const popup = new ol.Overlay({
      element: popupElement,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

    map.addOverlay(popup);

    map.on('postrender', this.props.updatePlacesList);

    this.props.updatePopupReferenceIfNeeded(popup);

    this.props.updateMapReferenceIfNeeded(map);
  }

  render(){
    return(
      <div>
        <span id="popup" className="ol-popup" ref="popup"></span>
        <div id="map" className="map"></div>
      </div>
    );
  }
};

Map.propTypes = {
  olMap: PropTypes.object,
  selectPlace: PropTypes.func,
  updateMapReferenceIfNeeded: PropTypes.func,
  updatePlacesList: PropTypes.func,
  updatePopupReferenceIfNeeded: PropTypes.func.isRequired
}

export default Map;
