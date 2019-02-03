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

  type Rate {
    currency: String!
    toEuro: Float!
  }

  type CurrencyPercent {
    currency: String!
    totalValue: Float!
    percent: Float!
  }

  extend type Query {
    allICOs(cursor: Int, limit: Int): [ICO!]!
    highestValue: [ICO!]!
    mostTransactions: ICO
    averageValue: Average!
    totalCurrencyPercent: [CurrencyPercent!]!
  }

  extend type Mutation {
    createICO(address: String!, currency: String!, value: Int!, txid: String!): ICO!
    deleteRate(currency: String!): Boolean!
    createRate(currency: String!, toEuro: Float!): Rate!
  }
`;
