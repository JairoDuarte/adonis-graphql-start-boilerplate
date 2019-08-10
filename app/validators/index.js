const { badRequest } = require('./Errors');

const { validate } = use('Validator');

exports.validator = async (body, rules, callback) => {
  const validation = await validate(body, rules);
  if (validation.fails()) {
    const error = validation.messages()[0];
    throw badRequest(`${error.message}`);
  }
  return callback;
};
