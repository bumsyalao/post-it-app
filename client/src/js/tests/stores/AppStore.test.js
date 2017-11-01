import AppStore from '../../stores/AppStore';
import AppAPI from '../../utils/AppAPI';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import StoreMock from '../mocks/StoreMock';


let spyOnDispatcher;
beforeEach(() => {
  jest.mock('axios');
  spyOnDispatcher = jest.spyOn(AppDispatcher, 'dispatch');
});

afterEach(() => {
  spyOnDispatcher.mockReset();
});

jest.mock('../../dispatcher/AppDispatcher');
const mockDispatcher = AppDispatcher.register.mock.calls[0][0];

describe('SIGN_UP', () => {
  it('should register a callback with the dispatcher', () => {
    expect(mockDispatcher.length).toBe(1);
  });

  xit('should get the vales and state of all methods', () => {
    mockDispatcher(StoreMock);
    AppAPI.getUsers({ user: 'Sly' });
    const result = AppAPI.getUsers();
    expect(result).toEqual([{ user: 'Sly' }]);
  });
});

describe('RECEIVE_CONTACT', () => {
  it('should register a callback with the dispatcher', () => {
    expect(mockDispatcher.length).toBe(1);
  });

  xit('should get the vales and state of all methods', () => {
    mockDispatcher(StoreMock);
    AppStore.setdatabaseUsers({ user: 'Sly' });
  });
});

describe('RECEIVE_LOGIN', () => {
  it('should register a callback with the dispatcher', () => {
    expect(mockDispatcher.length).toBe(1);
  });

  it('should get the authenticated state', () => {
    mockDispatcher(StoreMock);
    const result = (AppStore.getAuthenticatedState());
    expect(result).toBe(false);
  });

  it('should get the current user', () => {
    mockDispatcher(StoreMock);
    const result = (AppStore.getUser());
    expect(result).toBe('');
  });

  xit('should get the user stored in local Storage', () => {
    mockDispatcher(StoreMock);
    const result = (AppStore.getLoggedInUser());
    expect(result).toEqual([]);
  });

  xit('should get the user stored in local Storage', () => {
    mockDispatcher(StoreMock);
    AppStore.saveUser('Ebuka');
    AppStore.setAuth();
    AppStore.emit('change');
  });
});

describe('RECEIVE_EMAILS', () => {
  it('should register a callback with the dispatcher', () => {
    expect(mockDispatcher.length).toBe(1);
  });

  it('should get the vales and state of all methods', () => {
    mockDispatcher(StoreMock);
    AppStore.setEmails({ user: 'Sly' });
  });
});


describe('It test the RECEIVE_ALLUSERS_NUMBER actionType', () => {
  it('should register a callback with the dispatcher', () => {
    expect(mockDispatcher.length).toBe(1);
  });

  it('should get the vales and state of all methods', () => {
    mockDispatcher(StoreMock);
    AppStore.setAllUsersNumber({ user: 'Sly' });
  });
});


describe('It test the SAVE_GROUP actionType', () => {
  it('should register a callback with the dispatcher', () => {
    expect(mockDispatcher.length).toBe(1);
  });

  xit('should get the vales and state of all methods', () => {
    mockDispatcher(StoreMock);
    AppStore.saveGroup({ groupName: 'Andela' });
    AppAPI.saveGroup({ groupName: 'Andela' })
    .then(() => {
    });
  });
});


describe('GET_GROUPS', () => {
  it('should register a callback with the dispatcher', () => {
    expect(mockDispatcher.length).toBe(1);
  });

  it('should get the vales and state of all methods', () => {
    mockDispatcher(StoreMock);
    AppAPI.getGroups({ userName: 'Femi' })
    .then(() => {
    });
  });
});

describe('RECEIVE_GROUPS', () => {
  it('should register a callback with the dispatcher', () => {
    expect(mockDispatcher.length).toBe(1);
  });

  it('should get the vales and state of all methods', () => {
    mockDispatcher(StoreMock);
    AppStore.setGroups({ groupName: 'Andela' });
  });
});

describe('RECEIVE_NOTIFICATION', () => {
  it('should register a callback with the dispatcher', () => {
    expect(mockDispatcher.length).toBe(1);
  });

  it('should get the vales and state of all methods', () => {
    mockDispatcher(StoreMock);
    AppStore.setNotification({ notification: 'Green posted inAndela' });
  });
});

describe('SAVE_GROUP_USER', () => {
  it('should register a callback with the dispatcher', () => {
    expect(mockDispatcher.length).toBe(1);
  });

  xit('should get the vales and state of all methods', () => {
    mockDispatcher(StoreMock);
    AppStore.addUserToGroup({ userName: 'Femi' });
    AppAPI.addUserToGroup({ userName: 'Femi' })
    .then(() => {
    });
  });
});


describe('SAVE_MESSAGE', () => {
  it('should register a callback with the dispatcher', () => {
    expect(mockDispatcher.length).toBe(1);
  });

  xit('should get the vales and state of all methods', () => {
    mockDispatcher(StoreMock);
    AppStore.saveMessages({ message: 'I am a message' });
    AppAPI.saveMessages({ message: 'I am a message' })
    .then(() => {
    });
  });
});


describe('RECEIVE_MESSAGE', () => {
  it('should register a callback with the dispatcher', () => {
    expect(mockDispatcher.length).toBe(1);
  });

  it('should get the vales and state of all methods', () => {
    mockDispatcher(StoreMock);
    AppStore.setMessages({ message: 'I am a message' });
  });
});


describe('SEEN_MESSAGE', () => {
  it('should register a callback with the dispatcher', () => {
    expect(mockDispatcher.length).toBe(1);
  });

  it('should get the vales and state of all methods', () => {
    mockDispatcher(StoreMock);
    AppAPI.seenMessage({ users: 'Ebuka' })
    .then(() => {
    });
  });
});


describe('RECEIVE_SEEN_USERS', () => {
  it('should register a callback with the dispatcher', () => {
    expect(mockDispatcher.length).toBe(1);
  });

  it('should get the vales and state of all methods', () => {
    mockDispatcher(StoreMock);
    AppStore.setSeenUsers({ users: 'Ebuka' });
  });
});


describe('SIGN_IN', () => {
  it('should register a callback with the dispatcher', () => {
    expect(mockDispatcher.length).toBe(1);
  });

  it('should get the vales and state of all methods', () => {
    mockDispatcher(StoreMock);
    AppAPI.login({ email: 'fe@gmail.com', password: '123456' })
    .then(() => {
    });
  });
});


describe('LOGOUT', () => {
  it('should register a callback with the dispatcher', () => {
    expect(mockDispatcher.length).toBe(1);
  });

  it('should get the vales and state of all methods', () => {
    mockDispatcher(StoreMock);
    AppStore.setLogout();
    AppAPI.setLogout()
    .then(() => {
    });
  });
});


describe('GOOGLE_LOGIN', () => {
  it('should register a callback with the dispatcher', () => {
    expect(mockDispatcher.length).toBe(1);
  });

  it('should get the vales and state of all methods', () => {
    mockDispatcher(StoreMock);
    AppStore.setGoogleSignIn({ googleUser: 'we@gmail.com' });
  });
});


describe('SEARCH_USER_MESSAGE', () => {
  it('should register a callback with the dispatcher', () => {
    expect(mockDispatcher.length).toBe(1);
  });

  it('should get the vales and state of all methods', () => {
    mockDispatcher(StoreMock);
    AppStore.setCurrentGroup({ groupName: 'Ab' });
    AppAPI.searchUserMessageInGroup({ groupName: 'Ab' })
    .then(() => {
    });
  });
});


describe('RECEIVE_USER', () => {
  it('should register a callback with the dispatcher', () => {
    expect(mockDispatcher.length).toBe(1);
  });

  it('should get the vales and state of all methods', () => {
    mockDispatcher(StoreMock);
    AppStore.setGroupUsers({ groupName: 'Ab' });
  });
});

describe('RESET_PASSWORD', () => {
  it('should register a callback with the dispatcher', () => {
    expect(mockDispatcher.length).toBe(1);
  });

  it('should get the vales and state of all methods', () => {
    mockDispatcher(StoreMock);
    AppAPI.resetPassword({ email: 'wes@gmail.com' })
    .then(() => {
    });
  });
});


describe('NOTIFICATIONS', () => {
  it('should register a callback with the dispatcher', () => {
    expect(mockDispatcher.length).toBe(1);
  });

  it('should get the vales and state of all methods', () => {
    mockDispatcher(StoreMock);
    AppAPI.getNotifications({ useName: 'John' })
    .then(() => {
    });
  });
});
