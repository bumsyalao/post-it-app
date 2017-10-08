import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import Signup from '../components/Signup';
import GoogleWelcome from '../components/GoogleWelcome';

jest.mock('../../../../server/config', () => ({
  }));

describe('<Signup />', () => {

    it('contains a component', () => {
        const wrapper = shallow(<Signup />);
        expect(wrapper.find('div')).to.have.length(11);
        expect(wrapper.find('button')).to.have.length(1);
        expect(wrapper.find('form')).to.have.length(1);
    });

    it('State', () => {
        const wrapper = shallow(<Signup />);
        expect(wrapper.state().contacts).to.equal([]);
        expect(wrapper.state().databaseUsers).to.equal([]);
        expect(wrapper.state().emails).to.equal([]);
        expect(wrapper.state().numbers).to.equal([]);
        expect(wrapper.state().googleUser).to.equal([]);
    });

});
