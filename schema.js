export default `
  type ICO {
    _id: String!
    address: String!
    currency: String!
    value: Int!
    txid: String!
  }

  type Query {
    allICOs: [ICO!]!
  }

  type Mutation {
    createICO(address: String!, currency: String!, value: Int!, txid: String!): ICO!
  }
`;
