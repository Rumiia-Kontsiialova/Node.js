'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {

      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      author: {
        type: Sequelize.STRING
      },

      year: {
        type: Sequelize.INTEGER
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Books');
  }
};


//  так как  "type": "module"
// Это заставляет Node.js рассматривать все .js файлы как ES модули.
// Sequelize CLI миграции по умолчанию пишутся в CommonJS формате (module.exports = {...}).
// Поэтому Node выдаёт ошибку: ERROR: module is not defined in ES module scop
// Решение: поменять расширение файла миграции с .js на .cjs