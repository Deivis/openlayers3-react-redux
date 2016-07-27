/**
  This component is responsable for create the list of places(features) which will be selectable in the map and selected by the menu
*/

import React, { Component, PropTypes } from 'react';

class Menu extends Component{

  componentDidMount() {

  }

  shouldComponentUpdate() {

    return true;
  }

  renderPlace(selected, place, index){
    const className = selected !== null ? (selected.name === place.name ? 'selected' : '') : '';
    return(
      <li key={index}
          className={className}
          onClick={ this.props.selectPlace.bind(null, place) }>
        <label>{place.name}</label>
      </li>
    );
  }

  render(){
    const { places, selected} = this.props;
    return(
      <ul id="menu">
        { places.map(this.renderPlace.bind(this,selected)) }
      </ul>
    );
  }
};

Menu.propTypes = {
  places: PropTypes.array,
  selected: PropTypes.object,
  selectPlace: PropTypes.func
};

export default Menu;
