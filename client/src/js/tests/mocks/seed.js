export const error = {
  response: {
    data: {
      message: 'Internal Serer Error'
    }
  }
};

export const newStateProperty = {
  isAuthenticated: true,
  userName: 'Ebuka'
};

export const newObjectProperty = {
  user: 'Ebuka',
  allUsers: ['John', 'August'],
  groups: ['Andela', 'BookStore'],
  currentGroup: 'Andela',
  databaseUsers: ['James', 'August'],
  notification: ['James posted in Andela Group']
};

export const props = {
  group: [{ groupName: 'Andela' }],
  allUsers: ['George', 'Phil', 'Odim'],
  notification: ['George has posted in Green group'],
  userName: 'George'
};

export const dashboardProps = {
  createGroupModal: true,
  addUserModal: true,
  notificationModal: true,
  groupName: 'Pie',
  userName: 'George',
  users: ['Luke', 'John']
};

export const googleDetail = {
  displayName: 'Kate',
  email: 'kate@gmail.com',
  number: 2348900839454,
  uid: 23489008394542348900839454
};

export const messageProps = {
  message: [{ message: 'I am a message' }],
  group: 'Andela'
};
