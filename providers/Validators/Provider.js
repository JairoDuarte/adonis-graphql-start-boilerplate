const { ServiceProvider } = require('@adonisjs/fold');
const ExistRules = require('.');

class ValidatorProvider extends ServiceProvider {
  _addExistRule() {
    const { extend } = this.app.use('Adonis/Addons/Validator');
    const Database = this.app.use('Adonis/Src/Database');
    const validatorRules = new ExistRules(Database);

    extend('exist', validatorRules.exist.bind(validatorRules), '{{field}} has already been taken by someone else');
  }

  boot() {
    this._addExistRule();
  }
}

module.exports = ValidatorProvider;
