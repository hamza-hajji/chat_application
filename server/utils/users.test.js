const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {

  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: '1',
        name: 'Jack',
        room: 'Secret Room'
      },
      {
        id: '2',
        name: 'Derick',
        room: 'Fantasy Novels Room'
      },
      {
        id: '3',
        name: 'Pamela',
        room: 'Secret Room'
      }
    ];
  });

  it('should add new user', () => {
    var user = {
      id: '124578',
      name: 'Hamza',
      room: 'Fantasy Novels Room'
    }

    var user = users.addUser(user.id, user.name, user.room);

    expect(users.users.length).toNotBe(3);
    expect(users.users).toInclude(user);
  });

  it('should remove a user', () => {
    var user = users.removeUser('1');

    expect(user).toInclude({id: '1', name: 'Jack'});
    expect(users.users.length).toBe(2);
  });

  it('should not remove an invalid user', () => {
    var user = users.removeUser('not index');

    expect(user).toEqual(null);
    expect(users.users.length).toBe(3);
  });

  it('should get a user', () => {
    var user = users.getUser('3');

    expect(user).toInclude({id: '3', name: 'Pamela'});
  });

  it('should not get an invalid user', () => {
    var user = users.getUser('100');

    expect(user).toEqual(null);
  });

  it('should return list of names in the secret room', () => {
    var names = users.getUserList('Secret Room');

    expect(names).toEqual(['Jack', 'Pamela']);
  });


  it('should return list of names in the fantasy room', () => {
    var names = users.getUserList('Fantasy Novels Room');

    expect(names).toEqual(['Derick']);
  });
});
