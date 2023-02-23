const Employee = require('./employee.test');

class Manager {
  constructor(name, id, email, officeNumber) {
    (name, id, email);
    this.officeNumber = officeNumber;
    this.name = name;
    this.id = id;
    this.email = email;
  }
  getOfficeNumber() {
    return this.officeNumber;
  }
  getRole() {
    return 'Manager';
  }
}

module.exports = Manager;