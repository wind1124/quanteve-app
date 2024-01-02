export const formatMoney = (money: number, symbol: string = '$') => {
  if (money === 0 || money === null || money === undefined) {
    return '0'
  }
  if (money >= 10000) {
    return symbol + (money / 1000).toFixed(1) + 'k'
  }
  const [integerPart, decimalPart] = money.toString().split('.')
  const moneyArr = integerPart.split('')
  let result = ''
  let count = 0
  for (let i = moneyArr.length - 1; i >= 0; i--) {
    count++
    result = moneyArr[i] + result
    if (count % 3 === 0 && i !== 0) {
      result = ',' + result
    }
  }
  return symbol + result + (decimalPart ? '.' + decimalPart : '')
}

export const formatPercent = (num: number) => {
  if (num === 0 || num === null || num === undefined) return '0%'
  return (num * 100).toFixed(2) + '%'
}
