import * as AppActions from '../../actions/AppActions';
import AppDispatcher from '../../dispatcher/AppDispatcher';

describe('News API Actions', () => {
  let spyOnDispatcher;
  beforeEach(() => {
    jest.mock('axios');
    spyOnDispatcher = jest.spyOn(AppDispatcher, 'dispatch');
  });

  afterEach(() => {
    spyOnDispatcher.mockReset();
  });

  describe('logout Action should exist', () => {
    it('should exist', () => {
      expect(AppActions.logout).toBeDefined();
    });
  })
  

  describe('#getSources', () => {
    it('should exist', () => {
      expect(AppActions.saveContact).toBeDefined();
    });
  });

  describe('#resetPassword', () => {
    it('should exist', () => {
      expect(AppActions.resetPassword).toBeDefined();
    });

    const email = 'wesumeh@gmail.com';
    it('should dispatch #saveContact when called', () =>
    AppActions.resetPassword(email)
    );
  })
});
