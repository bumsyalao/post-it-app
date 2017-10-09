import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import App from '../../components/App';
import Footer from '../../components/Footer';
import Navigation from '../../components/Navigation';
import Routes from '../../components/Routes';
import Dashboard from '../../components/Dashboard/Dashboard'

jest.mock('../../../../../server/config', () => ({
  }));

describe('<App />', () => {

    it('contains a <Navigation /> for unauthenticated user', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Navigation)).to.have.length(1);
        wrapper.instance().componentDidMount();
        wrapper.instance().componentUnmount();       
    });

    it('contains a <Footer /> for unauthenticated user', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Dashboard)).to.have.length(1);
    });

    it('contains a <Footer /> for unauthenticated user', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Footer)).to.have.length(1);
    });

    it('contains a <Routes /> for unauthenticated user', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Routes)).to.have.length(1);
    });

    it('State', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.state().authentication).to.equal(false);
    });

    it('should call onChange', () => {
        const event = {
          target: {
            name: 'name',
            value: 'value',
          }
        };
        const wrapper = mount(<App />);
        wrapper.instance().onChange(event);
        expect(wrapper.state().name).toEqual('value');
        // expect(wrapper.state().authentication).to.equal(false);
      });

});
