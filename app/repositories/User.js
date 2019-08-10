const Base = use('App/repositories');

class User extends Base {
  async findOrCreate(data) {
    const { email } = data;
    let user = await this.model.findBy(email);
    if (!user) {
      user = await this.model.create(data);
    }
    return user ? user.toJSON() : null;
  }
}

module.exports = User;
