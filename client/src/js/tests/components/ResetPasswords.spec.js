import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import ResetPassword from '../components/ResetPassword';


describe('<ResetPassword  Component/>', () => {

    it('contains a <ResetPassword /> component', () => {
        const wrapper = shallow(<ResetPassword />);
        expect(wrapper.find('div')).to.have.length(6);
        expect(wrapper.find('h2')).to.have.length(1);
        expect(wrapper.find('h4')).to.have.length(1);
        expect(wrapper.find('form')).to.have.length(1);
        expect(wrapper.find('input')).to.have.length(1);
        expect(wrapper.find('a')).to.have.length(1);
        expect(wrapper.find('br')).to.have.length(3);
    });

});
