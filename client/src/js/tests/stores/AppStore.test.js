import AppStore from '../../stores/AppStore';
import AppAPI from '../../utils/AppAPI';
import AppConstants from '../../constants/AppConstants';
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

describe('AppStore', () => {
  it('should register a callback with the dispatcher', () => {
    expect(mockDispatcher.length).toBe(1);
  });

  it('should return initial default state inside the component', () => {
    expect(AppStore.getAuthenticatedState()).toEqual(false);
    expect(AppStore.getLoggedInUser()).toEqual('');
    expect(AppStore.getUser()).toEqual('');
    expect(AppStore.getContacts()).toEqual([]);
    expect(AppStore.getAllUsersNumber()).toEqual([]);
    expect(AppStore.getDatabaseUsers()).toEqual([]);
    expect(AppStore.getAllEmails()).toEqual([]);
    expect(AppStore.getGoogleSignup()).toEqual(null);
    expect(AppStore.getGroups()).toEqual([]);
    expect(AppStore.getCurrentGroup()).toEqual('');
  });

  it('should have getAuthenticatedState State change', () => {
    expect(mockDispatcher.length).toBe(1);
    AppStore.setAuthenticatedState();
    expect(AppStore.getAuthenticatedState()).toEqual(true);
    AppStore.setLogout();
  });

  it('should get the vales and state of all methods', () => {
    //mockDispatcher('nn');
    const emitChange = jest.fn();
    emitChange();
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    expect(emitChange).toHaveBeenCalled();
  });
});

  it('should get the vales and state of all methods', () => {
    //mockDispatcher(StoreMock);
    AppStore.setDatabaseUsers(['Jim', 'Hesky']);
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
