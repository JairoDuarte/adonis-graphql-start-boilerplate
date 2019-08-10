class ValidatorRules {
  constructor(Database) {
    this.Database = Database;
  }

  async exist(data, field, message, args, get) {
    const value = get(data, field);
    if (!value) {
      return;
    }

    const [collection] = args;
    const row = await this.Database.collection(collection)
      .where(field, value)
      .findOne();

    if (!row) {
      throw message;
    }
  }
}

module.exports = ValidatorRules;
