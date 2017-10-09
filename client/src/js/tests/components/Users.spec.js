import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Users from '../../components/Dashboard/Users'


describe('Users component', () => {
  it('About component should render as expected', () => {
    const tree = renderer.create(<Users />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});