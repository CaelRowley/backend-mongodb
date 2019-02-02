import { gql } from 'apollo-server-express';

export default gql`
  type ICO {
    _id: String!
    address: String!
    currency: String!
    value(text: Int): Int!
    txid: String!
  }

  type Average {
    value: Float!
  }

  extend type Query {
    allICOs(cursor: Int, limit: Int): [ICO!]!
    highestValue: [ICO!]!
    mostTransactions: ICO
    averageValue: Average!
  }

  extend type Mutation {
    createICO(address: String!, currency: String!, value: Int!, txid: String!): ICO!
  }
`;
