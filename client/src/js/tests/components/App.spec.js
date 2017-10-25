import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import App from '../../components/App';
import Footer from '../../components/Footer';
import Navigation from '../../components/Navigation';
import Routes from '../../components/Routes';
import Dashboard from '../../components/Dashboard/Dashboard'

jest.mock('../../../../../server/config', () => ({
  }));

describe('<App />', () => {
    const event = {
            user: 'ebuka',
            authentication: true,
            loggedInUser: [{ebuka:123},{andela:2333}],
            groups: [{andela:'jfh'},{dex:'kakjh'}]
      };
      const onChange = jest.fn();
    it('should contain a <Navigation /> for unauthenticated user', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Navigation)).toHaveLength(1);
        wrapper.instance().componentDidMount();
        wrapper.instance().componentUnmount();       
    });

    // it('should contain a <Dashboard /> component', () => {
    //     const wrapper = shallow(<App />);
    //     expect(wrapper.find(Dashboard)).toHaveLength(1);
    // });

    it('should contain a <Footer /> for unauthenticated user', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Footer)).toHaveLength(1);
    });

    it('should contain a <Routes /> for unauthenticated user', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Routes)).toHaveLength(1);
    });

    it('should return initial default state inside a component', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.state().authentication).toEqual(false);
        expect(wrapper.state().user).toEqual('');
        expect(wrapper.state().loggedInUser.length).toEqual(0);
        expect(wrapper.state().loggedInPicture.length).toEqual(0);
        expect(wrapper.state().groups.length).toEqual(0);
    });

    it('should call onChange method', () => {
        const wrapper = mount(<MemoryRouter><App event={event} onChange={onChange}/></MemoryRouter>);
        console.log(wrapper.setState().nodes[0].props.children.props.onChange)
        console.log(wrapper.instance().onChange())
        wrapper.instance().onChange(event);
        expect(wrapper.state().user).toEqual('ebuka');
      });

});
