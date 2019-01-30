import axios from 'axios';

export const allICOs = async () => axios.post(process.env.TEST_API_URL, {
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

export default {
  allICOs,
};
