const getPercentageDiscount = (valueWithDiscount, totalValue) => {
  return parseInt(100 - (100 * valueWithDiscount) / totalValue, 10)
}

export default getPercentageDiscount
