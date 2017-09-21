import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';


import Navigation from '../components/Navigation';

describe('<Navigation />', () => {

    it('contains a <Navigation /> component', () => {
        const wrapper = shallow(<Navigation />);
        expect(wrapper.find('div')).to.have.length(4);
        expect(wrapper.find('nav')).to.have.length(1);
        expect(wrapper.find('ul')).to.have.length(1);
        expect(wrapper.find('li')).to.have.length(1);
        expect(wrapper.find('span')).to.have.length(1);
    });

});
