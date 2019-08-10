/** @type {typeof import('./node_modules/@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/** @type {import('./node_modules/@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

class User extends Model {
  static get createTimestamp() {
    return 'createdAt';
  }

  static get updateTimestamp() {
    return 'updatedAt';
  }

  static get deleteTimestamp() {
    return 'deletedAt';
  }

  static boot() {
    super.boot();

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        const instance = userInstance;
        instance.password = await Hash.make(instance.password);
      }
    });
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token');
  }
}

module.exports = User;
