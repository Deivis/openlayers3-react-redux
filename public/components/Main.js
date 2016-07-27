import React, { Component, PropTypes } from 'react';

import Map from './Map';

import Menu from './Menu';

class Main extends Component {

  shouldComponentUpdate() {

		return true;
  }

	render(){
		const props = this.props;

		const {
            changeSelectedPlace,
            olMap,
            places,
            selected,
            updateMapReferenceIfNeeded,
            updatePlacesList,
            updatePopupReferenceIfNeeded
          } = props;

		return(
			<div>
				<Map  olMap={olMap}
              selectPlace={changeSelectedPlace}
              updateMapReferenceIfNeeded={updateMapReferenceIfNeeded}
              updatePlacesList={updatePlacesList}
              updatePopupReferenceIfNeeded={updatePopupReferenceIfNeeded}/>

        <Menu places={places}
              selected={selected}
              selectPlace={changeSelectedPlace} />
			</div>
		);
	}
};

Main.propTypes = {
  changeSelectedPlace: PropTypes.func.isRequired,
  olMap: PropTypes.object,
  places: PropTypes.array.isRequired,
	selected: PropTypes.object,
  updateMapReferenceIfNeeded: PropTypes.func.isRequired,
  updatePlacesList: PropTypes.func.isRequired,
  updatePopupReferenceIfNeeded: PropTypes.func.isRequired
};

export default Main;
