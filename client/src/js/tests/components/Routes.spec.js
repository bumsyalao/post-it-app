import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import Routes from '../components/Routes';
import Signin from '../components/Signin';
import Signup from '../components/Signup';
import Home from '../components/Home';
import Footer from '../components/Footer';
import ResetPassword from '../components/ResetPassword';
import GoogleWelcome from '../components/GoogleWelcome';
import DashBoard from '../components/Dashboard/Dashboard';
import SideBar from '../components/Dashboard/SideBar';

jest.mock('../../../../server/config', () => ({
}));

describe('<Routes />', () => {

    it('State', () => {
        const wrapper = shallow(<Routes />);
        expect(wrapper.props().authed).to.equal(undefined);
    });

});
