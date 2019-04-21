import express from "express";
import { ApolloServer } from "apollo-server-express";
import { importSchema } from "graphql-import";

import sequelize from "./utils/database";
import resolvers from "./resolvers";

import User from "./models/user";
import Product from "./models/product";

const port = process.env.PORT || "4000";
const app = express();

const typeDefs = importSchema("src/schema.graphql");

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => User.findByPk(1))
  .then(user => {
    if (!user) {
      return User.create({
        name: "YoYea",
        email: "test@gmail.com",
      });
    }
    return user;
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/graphql`);
    });
  })
  .catch(err => {
    console.log("Connect Database fail: ", err);
  });
