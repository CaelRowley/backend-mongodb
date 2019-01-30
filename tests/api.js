import axios from 'axios';

const API_URL = 'http://localhost:8000/graphql';

export const allICOs = async () => axios.post(API_URL, {
  query: `
    query {
      allICOs {
          address
          currency
          value
          txid
      }
    }
  `,
});
