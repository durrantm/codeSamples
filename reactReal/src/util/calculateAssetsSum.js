const calculateAssetsSum = (assets, prices = {}) => {
  let totalSum = 0;
  let price;
  assets?.length && prices?.BTC &&
    assets.map((i) => {
      switch (i.asset) {
      case 'BTC':
        price = prices.BTC;
        break;
      case 'ETH':
        price = prices.ETH;
        break;
      case 'LTC':
        price = prices.LTC;
        break;
      default:
        price = 0;
      }
      totalSum += Number(price * (Number(i.available) + Number(i.trading)));
      return 0;
    });
  return totalSum;
};

export default calculateAssetsSum;