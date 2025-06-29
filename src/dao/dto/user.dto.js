export default class UserDTO {
  last_connection;
  first_name;
  last_name;
  email;
  role;
  pets;
  documents;
  constructor(user) {
    this.last_connection = user.last_connection;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.role = user.role;
    this.pets = user.pets;
    this.documents = user.documents;
  }
}
