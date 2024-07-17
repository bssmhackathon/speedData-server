const Sequelize = require("sequelize");

class before extends Sequelize.Model {
  static initiate(sequelize) {
    before.init(
      {
        before_id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        before_speed: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "before",
        tableName: "before",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
}

module.exports = before;