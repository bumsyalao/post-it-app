import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import GoogleWelcome from '../components/GoogleWelcome';

describe('<GoogleWelcome  Component/>', () => {

    it('contains a <GoogleWelcome /> component', () => {
        const wrapper = shallow(<GoogleWelcome />);
        expect(wrapper.find('div')).to.have.length(7);
        expect(wrapper.find('h1')).to.have.length(1);
        expect(wrapper.find('p')).to.have.length(1);
    });

    it('State', () => {
      const wrapper = shallow(<GoogleWelcome />);
      expect(wrapper.state().databaseUsers).to.equal([]);
      expect(wrapper.state().numbers).to.equal([]);
      expect(wrapper.state().googleDetail).to.equal(null);      
  });

});
