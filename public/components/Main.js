import React, { Component, PropTypes } from 'react';

import Map from './Map';

class Main extends Component {

	componentDidMount() {

  }

  shouldComponentUpdate() {

  }

	render(){
		return(
			<div>
				<Map></Map>
			</div>
		);
	}
};

Main.propTypes = {
  map: PropTypes.object,
  selected: PropTypes.object,
  places: PropTypes.array
};

export default Main;
