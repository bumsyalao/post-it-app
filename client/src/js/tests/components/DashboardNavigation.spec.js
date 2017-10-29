import React from 'react';
import { mount, shallow } from 'enzyme';

import DashboardNavigation from '../../components/container/DashboardNavigation';
import GroupOptions from './../../components/presentation/GroupOptions';
import ModalButton from '../../components/presentation/ModalButton';

describe('DashBoardNavigation.js', () => {
  const group = [{ groupName: 'Andela' }];
  const allUsers = ['George', 'Phil', 'Odim'];
  const notification = ['George has posted in Green group'];
  const userName = 'George';
  let wrapper;
//   const newStateProperty = {
//     createGroupModal: true,
//     addUserModal: true,
//     notificationModal: true,
//     groupName: 'Pie',
//     userName: 'George',
//     users: ['Luke', 'John']
// };
  beforeEach(() => {
    console.log(document.body, 'wefafea')
  wrapper = mount( <DashboardNavigation
      group={group}
      allUsers={allUsers}
      notification={notification}
      userName={userName}/>
      );

  })
  it('test', () => {
    wrapper.setState({addUserModal: true});
    console.log(wrapper.find(ModalButton).length, 'lenghts')
  })

  it('should have initial state inside the component', () => {
    expect(wrapper.state().createGroupModal).toEqual(false);
    expect(wrapper.state().addUserModal).toEqual(false);
    expect(wrapper.state().notificationModal).toEqual(false);
    expect(wrapper.state().groupName).toEqual('');
    expect(wrapper.state().userName).toEqual('');
    expect(wrapper.state().users).toEqual([]);
  })
  

  it('should have initial props in the component', () => {
    expect(wrapper.props().group).toEqual([{ groupName: 'Andela' }])  
    expect(wrapper.props().allUsers).toEqual([ 'George', 'Phil', 'Odim' ])
    expect(wrapper.props().notification).toEqual(['George has posted in Green group'])  
    expect(wrapper.props().userName).toEqual('George')      
  })

  it('should expect modals to be in the component', () => {
   // expect(wrapper.props().group[0].groupName).toEqual('Andela')
    expect(wrapper.node.openModalUsers).toBeDefined();
    expect(wrapper.node.closeModalUsers).toBeDefined();
    expect(wrapper.node.openModalGroup).toBeDefined();
    expect(wrapper.node.closeModalGroup).toBeDefined();
    expect(wrapper.node.openModalNotification).toBeDefined();
    expect(wrapper.node.closeModalNotification).toBeDefined();
    expect(wrapper.node.addUser).toBeDefined();
    expect(wrapper.node.createGroup).toBeDefined();
    expect(wrapper.node.logout).toBeDefined();
    expect(wrapper.node.handleNotificationButton).toBeDefined();
    expect(wrapper.node.handleAddUserButton).toBeDefined();
   })

   it('should simulate a click', () => {
       const newStateProperty = {
          createGroupModal: true,
          addUserModal: true,
          notificationModal: true,
          groupName: 'Pie',
          userName: 'George',
          users: ['Luke', 'John']
      };

    //wrapper.find('button').at(3).simulate('click');
    wrapper.setState(newStateProperty);
    expect(wrapper.state().createGroupModal).toEqual(true);
    expect(wrapper.state().addUserModal).toEqual(true);
    expect(wrapper.state().notificationModal).toEqual(true);
    expect(wrapper.state().groupName).toEqual('Pie');
    expect(wrapper.state().userName).toEqual('George');
    expect(wrapper.state().users).toEqual(['Luke', 'John']);
        
  })
 



  it('should find initial components', () => {
    const component = shallow( <DashboardNavigation
      group={group}
      allUsers={allUsers}
      notification={notification}
      userName={userName}/>
      );
      const modalButtons = component.find('ModalButton');
     expect(modalButtons).toHaveLength(4);
    //  const mockCallBack = jest.fn()
     
    //  const button1 = shallow(<ModalButton openModal={mockCallBack}></ModalButton>)
    // modalButtons.first().simulate('click')
    //  expect(wrapper.state().createGroupModal).toEqual(true);
    //  console.log(button1)
    //  expect(wrapper.find('li')).toHaveLength(4);
    //  expect(wrapper.find('button')).toHaveLength(0);
     
  })

  it('should find the first modal component and open it', () => {
    const component = mount( <DashboardNavigation
      group={group}
      allUsers={allUsers}
      notification={notification}
      userName={userName}/>
      );

    const mockCallBack = jest.fn()  
    const anchor = component.find('a').first();
    anchor.simulate('click')
    expect(component.state().createGroupModal).toEqual(true);
    // console.log(component.state())

    // console.log(component.find('a').length)

 
    // component.find('a').at(0).simulate('click')
    // expect(component.state().createGroupModal).toEqual(false);
    // console.log(component.state())
  
  })
  it('should find the first modal component and open it', () => {
    const component = shallow( <DashboardNavigation
      group={group}
      allUsers={allUsers}
      notification={notification}
      userName={userName}/>
      );
      component.find('form').at(2).simulate('click');
      // const modalButtons = component.find(ModalButton);
      
      // console.log(modalButtons.length, 'whattt')
      // console.log(component.find('.whatever').length, 'length of something we do care about')
      // 
      // console.log(component.find('ModalButton').at(1).children().at(1), 'whatever')
      // console.log(component.find('div').children().at(1).props().userData.props.onSubmit({preventDefault: () => {}}), 'html')
    // const mockCallBack = jest.fn()  
    // const button = wrapper.find(ModalButton)
    // console.log(button.html(), 'button');
  })
  // it('should find the first modal component and close it', () => {
  //   const component = mount( <DashboardNavigation
  //     group={group}
  //     allUsers={allUsers}
  //     notification={notification}
  //     userName={userName}/>
  //     );

  //   const mockCallBack = jest.fn()  
  //   const anchor = component.find('a').at(0).simulate('click')
  //   expect(component.state().createGroupModal).toEqual(false);
  //   console.log(component.state())
  
  // })

  


  // it('should return initial default prop inside the component', () => {
  //   const wrapper = mount(<DashboardNavigation group={group}/>);
  //   //expect(wrapper.props().userName).toEqual('');
  //   console.log(wrapper.props())
  //   // expect(wrapper.state().allUsers.length).toEqual(0);
  //   // expect(wrapper.state().notification.length).toEqual(0);
  //   // expect(wrapper.state().group.length).toEqual(0);
  // });


})