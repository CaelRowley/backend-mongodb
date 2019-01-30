import { gql } from 'apollo-server-express';

export default gql`
  type ICO {
    _id: String!
    address: String!
    currency: String!
    value: Int!
    txid: String!
  }

  extend type Query {
    allICOs: [ICO!]!
  }

  extend type Mutation {
    createICO(address: String!, currency: String!, value: Int!, txid: String!): ICO!
  }
`;
