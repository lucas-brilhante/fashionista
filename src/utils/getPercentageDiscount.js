const getPercentageDiscount = (value_with_discount, total_value) =>{
    return parseInt(100 - (100* value_with_discount / total_value));
}

export default getPercentageDiscount;