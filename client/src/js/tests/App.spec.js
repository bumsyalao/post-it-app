import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import App from '../components/App';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';

describe('<App />', () => {

    it('contains a <Navigation /> and <Footer /> for unauthenticated user', () => {
        const wrapper = shallow(<App />);

        expect(wrapper.find(Navigation)).to.have.length(1);
        expect(wrapper.find(Footer)).to.have.length(1);
    });
});
