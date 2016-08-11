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

    // force the component to not update bacause the ol will do the map changes
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

    // create a new interaction for ol map
    const selectSingleClick = new ol.interaction.Select();

    map.addOverlay(popup);

    map.addInteraction(selectSingleClick);

    // add the selectFeature function in the single click  interaction
    selectSingleClick.on('select', this.props.selectFeature);

    // add a reference for the single click interaction in the map object
    map.selectSingleClick = selectSingleClick;

    /* Get the element which will close the popup and add an event listener
    *  because the openlayers create a new element based on the popup created in the
    * component and destroy the component popup
    */
    let closer = this.refs.closer;

    /* add the unselectPlace as listener of the click in the closer element
    * this is required because ol change the references of the popup element and
    * it children
    */
    closer.addEventListener('click', this.props.unselectPlace);

    // this listener feeds the menu places list with the map features
    map.on('postrender', this.props.updatePlacesList);

    this.props.updatePopupReferenceIfNeeded(popup);

    this.props.updateMapReferenceIfNeeded(map);
  }

  render(){
    return(
      <div>
        <div id="popup" className="ol-popup" ref="popup">
          <span className="ol-popup-closer" ref="closer"></span>
          <div id="innerPopup"></div>
        </div>
        <div id="map" className="map"></div>
      </div>
    );
  }
};

Map.propTypes = {
  olMap: PropTypes.object,
  selectFeature: PropTypes.func,
  updateMapReferenceIfNeeded: PropTypes.func,
  updatePlacesList: PropTypes.func,
  updatePopupReferenceIfNeeded: PropTypes.func.isRequired,
  unselectPlace: PropTypes.func.isRequired
};

export default Map;
