import { Sequelize } from "sequelize";

const db = new Sequelize("auth_db", "root", "1916130000msuH+", {
  host: "localhost",
  port: 3306, // Adding port configuration
  dialect: "mysql",
});

export default db;
