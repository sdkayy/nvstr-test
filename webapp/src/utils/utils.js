export const numToReadableDollar = (number, showPlus = true) => {
  return `${number < 0 ? "-" : showPlus ? "+" : ""}$${number
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export const percentToReadable = (percent) => {
  return `${percent < 0 ? "" : "+"}${Math.round(100 * percent) / 100}%`;
};
