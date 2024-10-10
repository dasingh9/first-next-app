import { UserService } from '../src/lib/services/user-service.js';
import { UserDao } from '../src/lib/dao/user-dao.js';
import { mock, instance, when, verify } from 'ts-mockito';
import { expect } from 'chai';

describe('Test UserService', () => {
  let userService;
  let mockedUserDao;

  beforeEach(() => {
    // Create a mock of the UserDAO
    mockedUserDao = mock(UserDao);
    // Inject the mock into UserService
    userService = new UserService(instance(mockedUserDao));
  });

  it('should return user when found', async () => {
    const user = { id: 1, name: 'John Doe' };

    // Mock the findById method of UserDAO
    when(mockedUserDao.findById(1)).thenResolve(user);

    const result = await userService.getUserById(1);

    // Verify that findById was called once
    verify(mockedUserDao.findById(1)).once();

    // Assert the result using Chai
    expect(result).to.deep.equal(user);
  });

  it('should throw an error when user is not found', async () => {
    // Mock the findById method to throw an error
    when(mockedUserDao.findById(1)).thenReject(new Error('User not found'));

    // Assert that an error is thrown
    try {
      await userService.getUserById(1);
    } catch (err) {
      expect(err.message).to.equal('User not found');
    }
  });

});