import express from "express";
import { ApolloServer } from "apollo-server-express";
import { importSchema } from "graphql-import";

import resolvers from "./resolvers";

const port = process.env.PORT || "4000";
const app = express();

const typeDefs = importSchema("src/schema.graphql");

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/graphql`);
});
