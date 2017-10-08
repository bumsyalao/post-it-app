import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import Signin from '../components/Signin';

jest.mock('../../../../server/config', () => ({
    // login: () => Promise.resolve('logged In')
  }));


describe('<Signin />', () => {

    it('contains a <GoogleWelcome /> component', () => {
        const wrapper = shallow(<Signin />);
        expect(wrapper.find('div')).to.have.length(6);
        expect(wrapper.find('button')).to.have.length(1);
        expect(wrapper.find('form')).to.have.length(1);
        expect(wrapper.find(GoogleWelcome)).to.have.length(1);
    });

    it('State', () => {
        const wrapper = shallow(<Signin />);
        expect(wrapper.state().emails).to.equal('');
        expect(wrapper.state().googleComponent).to.equal(false);
        expect(wrapper.state().googleUser).to.equal(false);
    });

});
