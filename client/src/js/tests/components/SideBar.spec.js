import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import SideBar from '../../components/presentation/SideBar';
import localStorageMock from '../../../../../mock/LocalStorageMock';
import AppStore from '../../stores/AppStore';

window.localStorage = localStorageMock;

jest.mock('../../../../../server/config', () => ({
  }));

describe('SideBar Component', () => {
  const groups = [{ groupName: 'Andela' }];
  const contacts = ['George', 'Phil', 'Odim'];
  const currentGroup = 'Andela';
  const userName = 'George';
  let wrapper;

  localStorage.setItem('user', JSON.stringify('Ebuka'));
  const user = JSON.parse(localStorage.getItem('user'))
 
  wrapper = mount( <SideBar
      contact={contacts}
      group={groups}
      currentGroup={currentGroup}
      user = {user} />
      );

  it('should display the necessary elements', () => {    
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('a').length).toBe(6);
    expect(wrapper.find('br').length).toBe(2);

});

});
