const axios = require('axios')
let url = 'https://currency.jafari.pw/json'
const getCurrencies   = () => {
  return axios(url)
}

module.exports.getCurrencyMenuItems = async () => {
let result = await getCurrencies()
let currencyMenu = result.data.Currency.map(currency => {
    return {
        label: `${currency.Code} - ${currency.Buy}`
    }
})
  let date = new Date(result.data.LastModified).toLocaleString()
  return {currencyMenu,date:date}
}