import React from 'react';
import { mount, shallow } from 'enzyme';

import ModalButton from './../../components/presentation/ModalButton';

describe('DashBoardNavigation.js', () => {
  const group = [{ groupName: 'Andela' }];
  const allUsers = ['George', 'Phil', 'Odim'];
  const notification = ['George has posted in Green group'];
  const userName = 'George';

  const newStateProperty = {
    menuName: 'CreTe',
    modalTitle: 'ghghs',
    modalState: false,
  };


it('should find the first modal component and open it', () => {
  const mockCallBack = jest.fn();
  const component = shallow( <ModalButton
    {...newStateProperty} openModal={mockCallBack}/>
    );
  expect(component.find('a')).toHaveLength(2);
  expect(component.find('Modal')).toHaveLength(1);
  expect(component.find('li')).toHaveLength(1);
})

it('should find the second modal component and open it', () => {
  const mockCallBack = jest.fn();
  const component = shallow( <ModalButton
    {...newStateProperty} openModal={mockCallBack}/>
    );
  expect(component.find('a')).toHaveLength(2);
  expect(component.find('Modal')).toHaveLength(1);
  expect(component.find('li')).toHaveLength(1);
})

it('should find the second a tag to close the modal', () => {
  const mockCallBack = jest.fn();
  const component = mount( <ModalButton
    {...newStateProperty} closeModal={mockCallBack}/>
    );
})
})