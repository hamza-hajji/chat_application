// addUser(id, name, room);
// removeUser(id);
// getUser(id);
// getUserList(id);

class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    var user = {id, name , room};
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    var user = this.getUser(id);
    if (!user) return null;
    var userIdx = this.users.indexOf(user);

    return this.users.splice(userIdx, 1)[0];
  }

  getUser(id) { // return null if array is empty
    return this.users.filter(user => user.id === id)[0] || null;
  }

  getUserList(room) {
    return this.users.filter((user) => user.room === room).map((user) => {
      return user.name;
    });
  }
}

module.exports = {Users};
