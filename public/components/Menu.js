/**
  This component is responsable for create the list of places(features) which will be selectable in the map and selected by the menu
*/

import React, { Component, PropTypes } from 'react';

class Menu extends Component{

  componentDidMount() {

  }

  shouldComponentUpdate() {

  }

  renderPlace(selectedIndex, place, index){
    return(
      <li key={index} onClick={ this.props.selectPlace.bind(null, index) }>
        <label>place.name</label>
      </li>
    );
  }

  render(){
    const { places, selectedIndex} = this.props;
    return(
      <ul id="menu">
        { places.map(this.renderPlace.bind(this,selectedIndex)) }
      </ul>
    );
  }
};

Menu.propTypes = {
  places: PropTypes.array,
  selectedIndex: PropTypes.number,
  selectPlace: PropTypes.func
};

export default Menu;
