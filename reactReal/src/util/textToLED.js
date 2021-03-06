const charToLED = {
  A: [
    [0, 0, 1, 1, 1, 1, 1],
    [0, 1, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1]
  ],
  B: [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [0, 1, 1, 0, 1, 1, 0]
  ],
  C: [
    [0, 1, 1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 1, 0]
  ],
  D: [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1, 1, 0]
  ],
  E: [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1]
  ],
  F: [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0]
  ],
  G: [
    [0, 1, 1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1],
    [1, 1, 0, 0, 1, 1, 1]
  ],
  H: [
    [1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1]
  ],
  I: [
    [0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0]
  ],
  J: [
    [0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0, 0, 0]
  ],
  K: [
    [1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 1]
  ],
  L: [
    [1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 1]
  ],
  M: [
    [1, 1, 1, 1, 1, 1, 1],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1]
  ],
  N: [
    [1, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1]
  ],
  O: [
    [0, 1, 1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1, 1, 0]
  ],
  P: [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0]
  ],
  Q: [
    [0, 1, 1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 0, 1]
  ],
  R: [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 1, 1]
  ],
  S: [
    [0, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 0]
  ],
  T: [
    [1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0]
  ],
  U: [
    [1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 0]
  ],
  V: [
    [1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0],
    [1, 1, 1, 1, 1, 0, 0]
  ],
  W: [
    [1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 0]
  ],
  X: [
    [1, 0, 0, 0, 0, 0, 1],
    [0, 1, 1, 0, 1, 1, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 1, 0],
    [1, 0, 0, 0, 0, 0, 1]
  ],
  Y: [
    [1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1],
    [0, 1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0]
  ],
  Z: [
    [1, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 1]
  ],
  0: [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1]
  ],
  1: [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ],
  2: [
    [1, 0, 0, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 0, 0, 1]
  ],
  3: [
    [1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1]
  ],
  4: [
    [1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1]
  ],
  5: [
    [1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 1]
  ],
  6: [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 1]
  ],
  7: [
    [1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0]
  ],
  8: [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1]
  ],
  9: [
    [1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1]
  ],
  ' ': [[0, 0, 0, 0, 0, 0, 0]],
  '.': [[0, 0, 0, 0, 0, 0, 1]],
  ':': [[0, 1, 0, 0, 0, 1, 0]],
  ',': [[0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 1, 1]],
  '-': [[0, 0, 1, 0, 0, 0, 1]]
};

const numRows = charToLED.A[0].length;

function textToLED(str) {
  const messageAsLED = [];
  const capitalized = str.toUpperCase();
  for (const char of capitalized) {
    if (!charToLED[char]) {
      if (process.env.NODE_ENV !== 'test') {
        console.log(
          `Can't convert '${char}' to an LED character. Please check the charToLED object.`
        );
        console.log(process.env.NODE_ENV);
      }
    } else {
      messageAsLED.push(...charToLED[char]);
      messageAsLED.push(...charToLED[' ']);
    }
  }
  return messageAsLED;
}

export { numRows, charToLED };
export default textToLED;
