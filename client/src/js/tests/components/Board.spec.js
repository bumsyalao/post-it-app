import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import Board from '../components/Dashboard/Board';
import Message from '../components/Dashboard/Message';

describe('<Board> Component', () => {

    it('contains a <Board /> component', () => {
        const wrapper = shallow(<Board />);
        expect(wrapper.find('div')).to.have.length(6);
        expect(wrapper.find('p')).to.have.length(1);
    });

    it('State', () => {
      const wrapper = shallow(<Board />);
      expect(wrapper.find(Message)).to.have.length(1);
  });

});
