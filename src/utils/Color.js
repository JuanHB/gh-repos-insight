/**
 * Generate a random RGB color
 */
const generateRgbaColor = () => {
  const o = Math.round, r = Math.random, s = 255;
  return [o(r()*s),o(r()*s),o(r()*s)].join(',');
};

export { generateRgbaColor };