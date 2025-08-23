'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Apps', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    size: {
      type: Sequelize.FLOAT,
      allowNull: false
    }
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Apps');
}


// NOTE: sequelize-cli по умолчанию создает миграции в CommonJS (module.exports).
// В проекте с "type": "module" (ESM) это вызывает ошибку: "module is not defined".
// Решение: либо переписать на ESM (export default {...}),
// либо переименовать файл миграции в .cjs, чтобы Node воспринимал его как CommonJS.
