// 价格分割，并添加分隔符
const getPriceFormatter = ({ separator = " ", length = 3 }) => text => {
  text = typeof text === "number" ? Math.floor(text) : text;
  return typeof text !== "undefined"
    ? String(text)
        .split("")
        .reverse()
        .reduce(
          (result, letter, index) => (
            result.unshift(
              letter,
              index > 0 && index % length === 0 ? separator : undefined
            ),
            result
          ),
          []
        )
        .join("")
    : text;
};

// 印尼价格简写
const priceShortID = value => {
  let price;

  if (value >= 1000 && value < 1000000) {
    price = `${(value / 1000).toFixed(2).replace(".", ",")}rb`;
  } else if (value >= 1000000 && value < 1000000000) {
    price = `${(value / 1000000).toFixed(2).replace(".", ",")}jt`;
  } else if (value >= 1000000000) {
    price = `${(value / 1000000000).toFixed(2).replace(".", ",")}M`;
  } else {
    price = `${value}`;
  }

  if (/,00(rb|jt|M)$/.test(price)) {
    return price.replace(",00", "");
  } else if (/,[1-9]0(rb|jt|M)$/.test(price)) {
    return /M$/.test(price)
      ? `${price.slice(0, -2)}M`
      : `${price.slice(0, -3)}${price.slice(-2)}`;
  } else {
    return price;
  }
};

// 越南价格简写
const priceShortVN = originPrice => {
  return originPrice >= 1000
    ? `${getPriceFormatter({ separator: "." })(
        Math.round(originPrice / 1000)
      )}K`
    : originPrice;
};

//  价格简写
export const priceShort = function(languageCode, originPrice) {
  if (!languageCode) return;
  if (typeof languageCode === "number") languageCode = languageCode.toString();
  switch (languageCode.toUpperCase()) {
    case "IN":
    case "1":
      return `RP ${priceShortID(originPrice)}`;
    case "MS":
    case "2":
      return `RM ${getPriceFormatter({ separator: "," })(originPrice)}`;
    case "EN":
    case "3":
      return `₱ ${getPriceFormatter({ separator: "," })(originPrice)}`;
    case "VI":
    case "4":
      return `₫ ${priceShortVN(originPrice)}`;
    default:
      return getPriceFormatter({ separator: "." })(originPrice);
  }
};
