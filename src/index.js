import express from "express";
import { ApolloServer } from "apollo-server-express";
import { importSchema } from "graphql-import";

import sequelize from "./utils/database";
import resolvers from "./resolvers";

const port = process.env.PORT || "4000";
const app = express();

const typeDefs = importSchema("src/schema.graphql");

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/graphql`);
    });
  })
  .catch(err => {
    console.log("Connect Database fail: ", err);
  });
