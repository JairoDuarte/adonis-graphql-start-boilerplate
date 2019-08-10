class Base {
  constructor(model) {
    this.model = model;
  }

  async insert(data) {
    const entity = await this.model.create(data);
    return entity ? entity.toJSON() : null;
  }

  async delete(id) {
    const entity = await this.model.find(id);
    return entity.delete();
  }

  async update(id, data) {
    const entity = await this.model.find(id);
    entity.merge(data);

    await entity.save();
    return entity.toJSON();
  }

  async getAll() {
    const entities = await this.model.all();
    return entities ? entities.toJSON() : [];
  }

  async getById(id) {
    const entity = await this.model.find(id);
    return entity ? entity.toJSON() : null;
  }
}

module.exports = Base;
