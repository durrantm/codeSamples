const calculateSum = (wallet, prices = {}) => {
  let totalSum = 0;
  let price;
  wallet?.items?.length && prices.BTC &&
    wallet.items.forEach((i) => {
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
      case 'USD':
        price = 1;
        break;
      default:
        price = 0;
      }
      totalSum += Number(price * (Number(i.available) + Number(i.trading)));
    });
  return totalSum;
};

export default calculateSum;