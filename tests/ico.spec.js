/* eslint-disable no-undef */

import { expect } from 'chai';
import * as api from './api';

describe('ICO', () => {
  describe('allICOs()', () => {
    it('returns a list of icos', async () => {
      const expectedResult = {
        data: {
          allICOs: [
            {
              address: '183nLVZFt3W6G79o5Yx8bTiEBsjER9eMVZ',
              currency: 'BTC',
              value: 504114,
              txid: 'f6b48e20e78ed5800ca07ea2a782a14227fee043de86f88eaaebcd88d34c9650',
            },
          ],
        },
      };
      const result = await api.allICOs();
      expect(result.data).to.eql(expectedResult);
    });
  });
});
