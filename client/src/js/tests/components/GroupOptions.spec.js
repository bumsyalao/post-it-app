import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import GroupOptions from '../../components/presentation/GroupOptions';
import groups from './../_mocks_/groups';


describe('GroupOptions component', () => {
 //groups.map((keyName, keyIndex) => <GroupOptions keyName={keyName} key={keyIndex} />)
  // it('It should render GroupOptions component', () => {
  //   const tree = renderer.create(<GroupOptions />);
  //   console.log(tree)
   
const groupName = {
  groupName: ' test'
}
  // });
  it('should contain a <Navigation /> for unauthenticated user', () => {
    const wrapper = mount (<MemoryRouter><GroupOptions groupName={groupName}/></MemoryRouter>); 
    
    const wrapper = shallow(<GroupOptions/>);
    expect(wrapper.props().groupName).to.be.defined;
  //  expect(wrapper.find(Navigation)).toHaveLength(1);
  //  wrapper.instance().componentDidMount();
  //  wrapper.instance().componentUnmount();       
});
});

