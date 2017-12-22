/**
 * Parses value, that is meant to be numerical to numerical equivalent
 * @param {String} value
 */
export const parseValue = (value, options = { round: false, decimals: null }) => {
  if (!value || !Number.isNaN(+(value))) return value;

  let parsed = +((value).toString().replace(',', '.'));

  if (options.round) parsed = Math.round(parsed);
  if (options.decimals) parsed = parsed.toFixed(options.decimals);

  return parsed;
};

/**
 * Eg. scaleToMillions(5400000) === '5.4 mil.'
 * @param {Number} value
 */
export const scaleToMillions = (value) => {
  if (!value
    || Number.isNaN(+(value))
    || value < 1E6) return value;

  let result = value / 1E6;
  if (result % 1 !== 0) { result = result.toFixed(3); }

  return `${result} mil.`;
};
