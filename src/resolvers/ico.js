/* eslint-disable no-underscore-dangle, no-param-reassign */

// const toCursorHash = string => Buffer.from(string).toString('base64');
// const fromCursorHash = string => Buffer.from(string, 'base64').toString('ascii');

const ETH_RATE = 92.66;
const BTC_RATE = 2985.82;
const LTC_RATE = 28.96;

export default {
  // ICO: {
  //   value: async (parent, args, context) => {
  //     console.log("ICO VALUE ARGS :");
  //     console.log(args);
  //     console.log(parent.value);
  //     if (args.text === parent.value)
  //       return parent.value
  //   },
  // },

  Query: {
    allICOs: async (parent, { cursor, limit }, { models }) => {
      const cursorOptions = cursor
        ? {
          value: {
            $gt: cursor,
          },
        }
        : {};

      let icos;
      if (limit && cursor) {
        icos = await models.ICO.find(
          cursorOptions,
          null,
          {
            sort: { value: -1 },
            limit: limit,
          },
        );
      } else {
        icos = await models.ICO.find();
      }

      return icos.map((ico) => {
        ico._id = ico._id.toString();
        return ico;
      });
    },

    highestValue: async (parent, args, { models }) => {
      const icos = await models.ICO.find();
      var maxValue = Math.max.apply(Math, icos.map(function (ico) { return ico.value; }))
      return icos.map((ico) => {
        if (ico.value == maxValue) {
          ico._id = ico._id.toString();
          return ico;
        }
      }).filter(function (el) {
        return el != null;
      });
    },

    mostTransactions: async (parent, args, { models }) => {
      const icos = await models.ICO.find();

      if (icos.length == 0)
        return null;

      var icoMap = {};
      let mostTransactions = icos[0];
      let maxCount = 1;

      for (var i = 0; i < icos.length; i++) {
        var currentIco = icos[i];
        if (icoMap[currentIco.address] == null)
          icoMap[currentIco.address] = 1;
        else
          icoMap[currentIco.address]++;

        if (icoMap[currentIco.address] > maxCount) {
          mostTransactions = currentIco;
          maxCount = icoMap[currentIco.address];
        }
      }
      mostTransactions._id = mostTransactions._id.toString();
      return mostTransactions;
    },

    averageValue: async (parent, args, { models }) => {
      const icos = await models.ICO.find();
      let total = 0;
      icos.forEach(function (ico) {
        total += ico.value
      });
      const value = total / icos.length;
      const average = await new models.Average({ value }).save();
      return average;
    },

    totalCurrencyPercent: async (parent, args, { models, loaders }) => {
      const icos = await models.ICO.find();
      let total = 0;
      let totalEthValue = 0;
      let totalBtcValue = 0;
      let totalLtcValue = 0;

      let ethRate = await loaders.rate.load("ETH");
      let btcRate = await loaders.rate.load("BTC");
      let ltcRate = await loaders.rate.load("LTC");

      icos.forEach(function (ico) {
        const currency = ico.currency;
        if (currency === "ETH") {
          totalEthValue = totalEthValue + (ico.value * ethRate.toEuro)
          total = total + (ico.value * ethRate.toEuro)
        } else if (currency === "BTC") {
          totalBtcValue = totalBtcValue + (ico.value * btcRate.toEuro)
          total = total + (ico.value * btcRate.toEuro)
        } else if (currency === "LTC") {
          totalLtcValue = totalLtcValue + (ico.value * ltcRate.toEuro)
          total = total + (ico.value * ltcRate.toEuro)
        }
      });

      let ethPercent = 0;
      let btcPercent = 0;
      let ltcPercent = 0;

      if (totalEthValue)
        ethPercent = totalEthValue / total;
      if (totalBtcValue)
        btcPercent = totalBtcValue / total;
      if (totalLtcValue)
        ltcPercent = totalLtcValue / total;

      return [
        {
          currency: "ETH",
          totalValue: totalEthValue,
          percent: ethPercent
        },
        {
          currency: "BTC",
          totalValue: totalBtcValue,
          percent: btcPercent
        },
        {
          currency: "LTC",
          totalValue: totalLtcValue,
          percent: ltcPercent
        },
      ]
    }
  },

  Mutation: {
    createICO: async (parent, args, { models }) => {
      const { address, currency, value, txid } = args;
      // const createdAt = new Date().setSeconds(date.getSeconds() + 1);
      const ico = await new models.ICO({ address, currency, value, txid }).save();
      ico._id = ico._id.toString();
      return ico;
    },

    createRate: async (parent, args, { models }) => {
      return await new models.Rate(args).save();
    },

    deleteRate: async (parent, args, { models }) => {
      const rates = await models.Rate.find();
      const rate = rates.map(rateToFind => {
        if (rateToFind.currency === args.currency)
          return rateToFind
      })
      if (rate) {
        return true;
      } else {
        return false;
      }
    },
  },
};
