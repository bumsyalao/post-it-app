import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Home from '../../components/Home'
import Signin from '../../components/Signin'

jest.mock('../../../../../server/config', () => ({
  }));

describe('Home', () => {
  it('About component should render as expected', () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});