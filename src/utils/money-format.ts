const formatMoney = (number: number, decimalSeparator: string = '.') => {
  // Check if the input is a valid number
  if (isNaN(number)) {
    return 'Invalid Number';
  }

  // Convert the number to a string and split it into integer and decimal parts
  const parts: string[] = number.toFixed(0).toString().split('.');

  // Add thousands separators to the integer part
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Join the integer part with the specified decimal separator
  return parts.join(decimalSeparator);
};

const convertVnd = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};
//300,000đ to 300000
const convertVndToNumber = (value: string) => {
  return parseInt(value.replace(/[^0-9]/g, ''));
};
export { convertVnd, convertVndToNumber, formatMoney };
