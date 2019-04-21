import Sequelize from "sequelize";

const sequelize = new Sequelize("graphql", "root", "secret", {
  dialect: "mysql",
  host: "localhost",
});

export default sequelize;
