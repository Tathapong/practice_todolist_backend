module.exports = (sequelize, DataTypes) => {
  const Todolist = sequelize.define(
    "Todolist",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    { underscored: true, paranoid: true }
  );

  Todolist.associate = (db) => {
    Todolist.belongsTo(db.User, { foreignKey: { name: "userId", allowNull: false } });
  };
  return Todolist;
};
