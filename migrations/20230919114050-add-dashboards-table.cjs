'use strict';

const TABLE_NAME = 'dashboards';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      TABLE_NAME, {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        isImportant: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        isOpened: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(TABLE_NAME);
  }
};
