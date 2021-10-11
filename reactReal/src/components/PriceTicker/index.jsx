import { useEffect, useMemo, useRef, useState } from 'react';
import { number } from 'prop-types';
import useLocalStorageRef from '../../hooks/useLocalStorageRef';
import useWalletAndPrices from '../../hooks/useWalletAndPrices';
import textToLED, { numRows } from '../../util/textToLED';
import PriceTickerCell from './PriceTickerCell';
import { frameRates } from './frameRates';
import commaForThousands from '../../util/commaForThousands';

function PriceTicker({ width = 800, height = 15 }) {
  const deltaY = useMemo(() => height / numRows, [height]);
  const numCols = useMemo(() => Math.floor(width / deltaY), [width, deltaY]);
  const deltaX = useMemo(() => width / numCols, [width, numCols]);
  const lastTime = useRef(null);
  const animationFrameId = useRef(null);
  const [paused] = useLocalStorageRef('ticker:paused', false);
  const [frameRateIdx] = useLocalStorageRef('ticker:fpsIdx', 3);
  const [messageStr, setMessage] = useState('');
  const message = useMemo(() => textToLED(messageStr), [messageStr]);
  const leftWhenPaused = useMemo(() =>
    message.length >= numCols ?
      0 :
      Math.floor((numCols - message.length) / 2), [message, numCols],
  [message, numCols]);
  const [left, setLeft] = useState(numCols + 1);
  const { bidPrices } = useWalletAndPrices();

  const formattedPrice = (price) => {
    const result = price >= 10000 ? commaForThousands(price) : price;
    return result;
  };

  useEffect(() => {
    if (paused.current) setLeft(leftWhenPaused);
  }, [leftWhenPaused]);

  useEffect(() => {
    const tickerStr = bidPrices
      .map(({ currency, lastPrice }) => `${currency}: ${formattedPrice(lastPrice)}`)
      .join('                        ');
    setMessage(tickerStr);
  }, [bidPrices]);

  useEffect(() => {
    function draw(time) {
      const fps = frameRates[frameRateIdx.current];
      const frameMinTime = 1000 / fps;
      const timeDelta = time - lastTime.current;
      if (timeDelta < frameMinTime) {
        animationFrameId.current = requestAnimationFrame(draw);
        return;
      }
      const framesElapsed = Math.floor(timeDelta / frameMinTime);
      lastTime.current = time;
      const furthestLeftPoint = -message.length;
      if (!paused.current) {
        setLeft(oldLeft => {
          if (oldLeft < furthestLeftPoint) {
            return numCols;
          }
          return oldLeft - framesElapsed;
        });
      }
      animationFrameId.current = requestAnimationFrame(draw);
    }
    animationFrameId.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationFrameId.current);
  }, [message, numCols]);

  return (
    <div className="price-ticker-wrapper">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="price-ticker"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {Array.from({length: numCols * numRows}, (_, i) => {
          const rowIdx = Math.floor(i / numCols);
          const colIdx = i % numCols;
          const colOffset = colIdx - left;
          let onStatus = 0;
          if (colOffset >= 0 && colOffset < message.length) {
            onStatus = Number(message[colOffset][rowIdx]);
          }
          const radiusMultipler = 0.45;
          return (
            <PriceTickerCell
              key={`${colIdx}-${rowIdx}`}
              x={deltaX * (colIdx + 1 / 2)}
              y={deltaY * (rowIdx + 1 / 2)}
              r={Math.min(deltaX, deltaY) * radiusMultipler}
              on={onStatus}
            />
          );
        })}
      </svg>
    </div>
  );
}

PriceTicker.propTypes = {
  width: number,
  height: number
};

export default PriceTicker;
