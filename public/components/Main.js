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
            selectFeature,
            updateMapReferenceIfNeeded,
            updatePlacesList,
            updatePopupReferenceIfNeeded,
            unselectPlace
          } = props;

		return(
			<div>
				<Map  olMap={olMap}
              selectFeature={selectFeature}
              updateMapReferenceIfNeeded={updateMapReferenceIfNeeded}
              updatePlacesList={updatePlacesList}
              updatePopupReferenceIfNeeded={updatePopupReferenceIfNeeded}
              unselectPlace={unselectPlace}/>

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
  selectFeature: PropTypes.func.isRequired,
  updateMapReferenceIfNeeded: PropTypes.func.isRequired,
  updatePlacesList: PropTypes.func.isRequired,
  updatePopupReferenceIfNeeded: PropTypes.func.isRequired,
  unselectPlace: PropTypes.func.isRequired
};

export default Main;
