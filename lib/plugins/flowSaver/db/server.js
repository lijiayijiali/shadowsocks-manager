'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const knex = appRequire('init/knex').knex;
const tableName = 'server';
const config = appRequire('services/config').all();

const createTable = (() => {
  var _ref = _asyncToGenerator(function* () {
    if (config.empty) {
      yield knex.schema.dropTableIfExists(tableName);
    }
    yield knex.schema.createTableIfNotExists(tableName, function (table) {
      table.increments('id');
      table.string('name');
      table.string('host');
      table.integer('port');
      table.string('password');
      table.string('method');
    });
    const list = yield knex('server').select(['name', 'host', 'port', 'password']);
    if (list.length === 0) {
      const host = config.manager.address.split(':')[0];
      const port = +config.manager.address.split(':')[1];
      const password = config.manager.password;
      yield knex('server').insert({
        name: 'default',
        host,
        port,
        password
      });
    }
    return;
  });

  return function createTable() {
    return _ref.apply(this, arguments);
  };
})();

exports.createTable = createTable;