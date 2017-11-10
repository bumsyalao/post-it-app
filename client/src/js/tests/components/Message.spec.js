import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Message from '../../components/container/Message';
import AppActions from '../../actions/AppActions';
import { messageProps } from '../mocks/seed';

jest.mock('../../../../../server/config', () => ({
}));
jest.mock('../../actions/AppActions');

let spyOnDispatcher;
beforeEach(() => {
  spyOnDispatcher = jest.spyOn(AppActions, 'seenMessage');
});

afterEach(() => {
  spyOnDispatcher.mockReset();
});


describe('Message component', () => {
  it('should create a snapshot of itself', () => {
    const tree = renderer.create(<Message />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  const wrapper = mount(<Message {...messageProps} />);

  it('should display the necessary elements', () => {
    expect(wrapper.props().message).toEqual([{ message: 'I am a message' }]);
    expect(wrapper.props().group).toEqual('Andela');
  });

  it('should display the necessary elements', () => {
    expect(wrapper.find('div').length).toBe(3);
    expect(wrapper.find('p').length).toBe(1);
    expect(wrapper.find('span').length).toBe(2);
  });


  it('expects the following functions defined', () => {
    wrapper.instance().componentWillMount();
    wrapper.instance().componentWillUnmount();
    wrapper.instance().onChange();
    wrapper.instance().closeModal();
  });


  it('should expect seenMessage AppAction to be called', () => {
    const event = {
      target: {
        name: 'name',
        value: 'value',
      },
      preventDefault: () => jest.fn()
    };

    wrapper.instance().handleSeenMessage(event);
    expect(spyOnDispatcher).toHaveBeenCalled();
  });
});

