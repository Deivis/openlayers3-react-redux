import React from 'react';

import TestUtils from 'react-addons-test-utils';

import Menu from '../../public/components/Menu';

const setup = () => {

  const places = [{
                    name: "Lab for Spatial Informatics",
                    time: "2011-08-22"
                  },
                  {
                    name: "University of Nottingham, Malaysia campus",
                    time: "2012-01-09"
                  }];

  const props = {
    selected: {},
    places: places,
    selectPlace: () => { return  places[0]; }
  };

  let renderer = TestUtils.createRenderer();

	renderer.render(<Menu {...props} />);

  let component = renderer.getRenderOutput();

  return {
    props,
    renderer,
    component
  };
}

describe('Menu component: ', () => {

  const { props, renderer, component } = setup();

  const menuChildren =  component.props.children;

  beforeEach(function() {
    spyOn(props, 'selectPlace');
  });

  it('Should render correctly an Menu component', () => {

		expect(component).toBeDefined();
		expect(component.type).toEqual('ul');
	});

  it('Should have two child li', () => {

		expect(menuChildren.length).toBe(2);

    expect(menuChildren[0].type).toBe('li');

    expect(menuChildren[1].type).toBe('li');
	});

  it('Should trigger selectPlace function when a child li is clicked',() =>{

    //TODO: find a better way to test the DOM events
    //PS: TestUtils.{event} isn't working in this context

    const li = menuChildren[0];

    const selected = li.props.onClick();

    expect(selected).toEqual(props.places[0]);
  });

});
