// Uses Intl to format currency to BRL

const currencyMask = (value) => {
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export default currencyMask
