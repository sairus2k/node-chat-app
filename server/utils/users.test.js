const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course',
    }, {
      id: '2',
      name: 'Jen',
      room: 'React Course',
    }, {
      id: '3',
      name: 'Julie',
      room: 'Node Course',
    }]
  });

  it('should add new user', () => {
    const users = new Users();
    const user = {
      id: '123',
      name: 'Username',
      room: 'The Office Fans',
    };
    const resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
    expect(resUser).toEqual(user);
  });

  it('should remove a user', () => {
    const user = users.users[0];
    expect(users.removeUser(user.id)).toEqual(user);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    expect(users.removeUser('4')).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    expect(users.getUser('1')).toEqual(users.users[0]);
  });

  it('should not find user', () => {
    expect(users.getUser('4')).toNotExist();
  });

  it('should return names for node course', () => {
    expect(users.getUserList('Node Course')).toEqual(['Mike', 'Julie']);
  });

  it('should return names for react course', () => {
    expect(users.getUserList('React Course')).toEqual(['Jen']);
  });
});
