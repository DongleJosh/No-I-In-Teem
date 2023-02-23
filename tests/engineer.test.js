const Employee = require('./employee.test');

class Engineer {
  constructor(name, id, email, github) {
    (name, id, email, github);
    this.name = name;
    this.id = id;
    this.email = email;
    this.github = github;
  }
  getGithub() {
    return this.github;
  }
  getRole() {
    return 'Engineer';
  }
}

module.exports = Engineer;