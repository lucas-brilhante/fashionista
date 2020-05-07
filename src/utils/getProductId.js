const getProductId = (product) => {
    const id=product.sizes[0].sku
    .replace(/(?!.*_.*)(.*)/, '')
    .replace(/(_0_)/, '');
    return id;
}

export default getProductId;