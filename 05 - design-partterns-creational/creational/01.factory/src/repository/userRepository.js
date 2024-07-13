class UserRepository {
  // injeção de dependencias
  constructor({ dbConnection }) {
    this.dbConnection = dbConnection;
  }

  async find(query) {
    return this.dbConnection.find(query)
  }
}

module.exports = UserRepository
