export const formatCurrencyToVnd = (numericValue: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(numericValue);
