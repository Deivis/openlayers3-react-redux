import React, { Component, PropTypes } from 'react';

import Map from './Map';

import Menu from './Menu';

class Main extends Component {

	componentDidMount() {

  }

  shouldComponentUpdate() {

  }

	render(){
		const props = this.props;

		const { places, selectedIndex, selectPlace} = props;

		return(
			<div>
				<Map {...props} />
				<Menu places={places} selected={selectedIndex} selectPlace={selectPlace} />
			</div>
		);
	}
};

Main.propTypes = {
  map: PropTypes.object,
  selectedIndex: PropTypes.number,
  places: PropTypes.array,
	selectPlace: PropTypes.func
};

export default Main;
