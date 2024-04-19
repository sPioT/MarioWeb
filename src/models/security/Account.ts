export default class Account {
  firstname: string;
  lastname: string;
  telephone: string;
  address: string;
  password: string;
  constructor(
    firstname: string,
    lastname: string,
    telephone: string,
    address: string,
    password: string
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.telephone = telephone;
    this.address = address;
    this.password = password;
  }
}
