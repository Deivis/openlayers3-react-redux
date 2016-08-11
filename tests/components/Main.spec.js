import React from 'react';

import TestUtils from 'react-addons-test-utils';

import Main from '../../public/components/Main';

import Map from '../../public/components/Map';

import Menu from '../../public/components/Menu';

const setup = () =>{
  const props = {
    changeSelectedPlace: () => { return true; },
    olMap: {},
    places: [],
    selected: {},
    updateMapReferenceIfNeeded: () => { return true; },
    updatePlacesList: () => { return true; },
    updatePopupReferenceIfNeeded: () => { return true; }
  };

  const renderer = TestUtils.createRenderer();

	renderer.render(<Main {...props} />);

  const component = renderer.getRenderOutput();

  return {
    props,
    renderer,
    component
  };
}

describe('Main compoment: ', () => {
  const { props, renderer, component } = setup();

  describe('Should mount the component Main correctly ',() => {

    it('Should the component exists', () => {

      expect(component).toBeDefined();
    });

    it('The component must be a div',() => {

      expect(component).toBeDefined();

      expect(component.type).toBe('div');
    });

    it('The child div must have a Map component and a Menu component as childern',() => {
      const [ MapComponent, MenuComponent ] = component.props.children;

      expect(MapComponent).toBeDefined();

      expect(MapComponent.type).toEqual(Map);

      expect(MenuComponent).toBeDefined();

      expect(MenuComponent.type).toEqual(Menu);
    });

  });
});
