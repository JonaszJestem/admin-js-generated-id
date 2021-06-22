const { TypeORMUser } = require("./build/user.entity");

module.exports = {
  type: "sqlite",
  database: ":memory:",
  dropSchema: true,
  entities: ["**/*.entity.js"],
  synchronize: true,
  logging: false,
};
