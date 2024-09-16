import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Query {
    getItems: [Item]
    getItem(id: ID!): Item
  }

  type Mutation {
    createItem(name: String!): Item
    updateItem(id: ID!, name: String!): Item
    deleteItem(id: ID!): String
  }

  type Item {
    id: ID!
    name: String!
  }
`;
