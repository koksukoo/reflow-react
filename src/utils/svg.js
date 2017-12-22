import { colorMap } from 'utils/constants';

/**
 * @param  {Array} c Coordinate. [[sourceX,sourceY], [targetX,targetY]]
 * @return {String}  Svg arc string
 */
export const drawArcs = (c) => {
  const bend = 1.3;
  const d = { source: c[0], target: c[1] };
  const dx = d.target[0] - d.source[0];
  const dy = d.target[1] - d.source[1];
  const dr = Math.sqrt((dx * dx) + (dy * dy)) * bend;
  const sweep = d.target[0] - d.source[0] < 0 ? 0 : 1;
  return `M${d.source[0]},${d.source[1]}A${dr} ${dr} 0 0,${sweep} ${d.target[0]},${d.target[1]}`;
};

export const setLineColor = (current, max) => {
  const selectedMax = +max <= 1000 ? +max : 1000;
  const scaledCount = Math.ceil(Math.min((+current / +selectedMax) * 100, 100));

  return colorMap[scaledCount - 1];
};
