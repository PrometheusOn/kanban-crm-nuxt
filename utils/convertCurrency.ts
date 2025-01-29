export const convertCurrency = (amount: string | number) => {
  return new Intl.NumberFormat('ru-ru', {
    style: 'currency',
    currency: 'RUB'
  }).format(+amount)
}