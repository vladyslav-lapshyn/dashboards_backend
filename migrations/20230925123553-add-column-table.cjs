'use strict';

const TABLE_NAME = 'columns';

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
        dashboardId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'dashboards',
            key: 'id'
          },
          onDelete: 'CASCADE',
        },
        title: {
          allowNull: false,
          type: Sequelize.STRING
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
