export const batchRates = async (currencies, models) => {
  const rates = await models.Rate.find({
    currency: {
      $in: currencies,
    },
  });
  return rates.map(rate => rates.find(rateToFind => rateToFind === rate));
};
