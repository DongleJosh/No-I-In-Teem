const Employee = require('./employee.test');

class Intern {
  constructor(name, id, email, school) {
    (name, id, email);
    this.name = name;
    this.id = id;
    this.email = email;
    this.school = school;
  }
  getOfficeNumber() {
    return this.school;
  }
  getRole() {
    return 'Intern';
  }
}

module.exports = Intern;