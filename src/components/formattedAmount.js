export const formattedAmount = (amount) => {
  amount = amount.toString();

  if (amount.length > 3 && amount.length < 6) {
    amount =
      amount.substring(0, amount.length - 3) +
      "," +
      amount.substring(amount.length - 3);
  } else if (amount.length == 6) {
    amount =
      amount.substring(0, amount.length - 5) +
      "," +
      amount.substring(amount.length - 5, amount.length - 3) +
      "," +
      amount.substring(amount.length - 3);
  } else if (amount.length >= 7 && amount.length < 10) {
    amount =
      amount.substring(0, amount.length - 6) +
      "," +
      amount.substring(amount.length - 6, amount.length - 3) +
      "," +
      amount.substring(amount.length - 3);
  } else if (amount.length > 9 && amount.length < 13) {
    amount =
      amount.substring(0, amount.length - 9) +
      "," +
      amount.substring(amount.length - 9, amount.length - 6) +
      "," +
      amount.substring(amount.length - 6, amount.length - 3) +
      "," +
      amount.substring(amount.length - 3);
  } else if (amount.length > 12) {
    amount =
      amount.substring(0, amount.length - 12) +
      "," +
      amount.substring(amount.length - 12, amount.length - 9) +
      "," +
      amount.substring(amount.length - 9, amount.length - 6) +
      "," +
      amount.substring(amount.length - 6, amount.length - 3) +
      "," +
      amount.substring(amount.length - 3);
  }

  return amount;
};
