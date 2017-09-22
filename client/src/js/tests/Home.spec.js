import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import Home from '../components/Home';
import Signin from '../components/Signin';

describe('<Home  Component/>', () => {

    it('contains a <Home /> component', () => {
        const wrapper = shallow(<Home />);
        expect(wrapper.find('div')).to.have.length(6);
        expect(wrapper.find('h1')).to.have.length(1);
        expect(wrapper.find('p')).to.have.length(1);
    });

    it('contains a <Signin /> for unauthenticated user', () => {
      const wrapper = shallow(<Home />);
      expect(wrapper.find(Signin)).to.have.length(1);
  });

});
