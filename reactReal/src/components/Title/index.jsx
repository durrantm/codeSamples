import { useCallback, useState } from 'react';
import total from '../../util/total';
import commaForThousands from '../../util/commaForThousands';
import useWalletAndPrices from '../../hooks/useWalletAndPrices';
import AllocationBarRollover from '../AllocationBarRollover';
import { Link } from 'react-router-dom';

function Title() {
  const { bidPrices, wallet } = useWalletAndPrices();
  const [rolloverInfo, setRolloverInfo] = useState(null);
  const resetRollover = useCallback(() => setRolloverInfo(null));
  const handleChange = useCallback((e, allocation, percentage) => {
    const { pageX: x, pageY: y } = e;
    const { currency, available, trading, total } = allocation;
    const prefix = currency === 'USD' ? '$' : '';
    const digits = currency === 'USD' ? 0 : 2;
    const avail = commaForThousands(available.toFixed(digits));
    const trade = commaForThousands(trading.toFixed(digits));
    const sum = commaForThousands(total.toFixed(digits));

    let bidPriceLabel = '';
    let bidPriceDisplay = '';
    if (currency !== 'USD') {
      bidPriceLabel = 'Mkt: $';
      const bidPrice = bidPrices.find(market => market.currency === currency).lastPrice;
      bidPriceDisplay = commaForThousands(Number(bidPrice).toFixed(0));
    }
    setRolloverInfo({
      content: [
        `${percentage}`,
        `${bidPriceLabel}${bidPriceDisplay}`,
        `Available: ${prefix}${avail}`,
        `Trading: ${prefix}${trade}`,
        `Total: ${prefix}${sum}`
      ],
      className: currency,
      x,
      y
    });
  });

  const percent = useCallback(
    (val, total) => `${(val / total * 100).toFixed(2)}%`,
    []
  );
  const totalsByMarket = wallet?.items.reduce((allocations, item) => {
    const allocation = {
      currency: item.asset,
      available: Number(item.available),
      trading: Number(item.trading),
      total: Number(item.available) + Number(item.trading)
    };

    if (allocation.currency === 'USD') {
      allocation.totalInUSD = allocation.total;
    } else {
      const bidPrice = bidPrices.find(
        ({ currency }) => currency === allocation.currency
      );
      allocation.totalInUSD =
        Number(bidPrice?.lastPrice) * allocation.total || 0;
    }

    if (allocation.totalInUSD) {
      allocations.push(allocation);
    }

    return allocations;
  }, []);
  if (totalsByMarket?.length === 0) {
    totalsByMarket.push({
      currency: 'USD', totalInUSD: 1, available: 0, trading: 0, total: 0
    });
  }
  const totalInDollars = totalsByMarket
    ? total(totalsByMarket, mkt => mkt.totalInUSD)
    : 0;
  return (
    <>
      <Link to="/" id="app-title">
        <h1>
          PAXOS AT
        </h1>
      </Link>
      <div className="allocation-bar">
        {totalsByMarket?.map(allocation => {
          const percentage = percent(allocation.totalInUSD, totalInDollars);
          return (
            <div
              key={allocation.currency}
              className={allocation.currency}
              style={{ width: percentage }}
              onTouchMove={e => handleChange(e, allocation, percentage)}
              onMouseMove={e => handleChange(e, allocation, percentage)}
              onTouchEnd={resetRollover}
              onMouseOut={resetRollover}
              data-testid="allocation-segment"
            />
          );
        })}
      </div>
      {rolloverInfo && <AllocationBarRollover {...rolloverInfo} />}
    </>
  );
}

export default Title;
