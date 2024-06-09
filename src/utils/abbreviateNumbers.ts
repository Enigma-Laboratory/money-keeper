export const abbreviateNumbers = (value: number) => {
  if (value === 0) return { value: 0, unit: '' };
  const units = ['', 'K', 'M', 'B'];
  const k = 1000;
  const magnitude = Math.floor(Math.log(value) / Math.log(k));
  return {
    value: value / Math.pow(k, magnitude),
    unit: units[magnitude],
  };
};
