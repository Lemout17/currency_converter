import './App.css'
import CurrencyInput from './components/CurrencyInput/CurrencyInput'
import { useState, useEffect } from 'react'
import Header from './components/Header/Header'

var myHeaders = new Headers()
myHeaders.append('apikey', 'z4y1T2I6IVaeo2ZKwGNU9yhqQHkNRXhi')

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders,
}

function App() {
  const [amount1, setAmount1] = useState(1)
  const [amount2, setAmount2] = useState(1)
  const [currency1, setCurrency1] = useState('USD')
  const [currency2, setCurrency2] = useState('EUR')
  const [rates, setRates] = useState([])
  const [usdAmount, setUsdAmount] = useState(0)

  useEffect(() => {
    fetch(
      'https://api.apilayer.com/fixer/latest?symbols=UAH&base=USD',
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => setUsdAmount(data.rates['UAH']))
      .catch((error) => console.log('error', error))
  })

  useEffect(() => {
    fetch('https://api.apilayer.com/fixer/latest', requestOptions)
      .then((response) => response.json())
      .then((data) => setRates(data.rates))
      .catch((error) => console.log('error', error))
  }, [])

  useEffect(() => {
    if (!!rates) {
      handleAmount1Change(1)
    }
  }, [rates])

  const formatNumber = (number) => number.toFixed(4)

  const handleAmount1Change = (amount1) => {
    setAmount2(formatNumber((amount1 * rates[currency2]) / rates[currency1]))
    setAmount1(amount1)
  }

  const handleCurrency1Change = (currency1) => {
    setAmount2(formatNumber((amount1 * rates[currency2]) / rates[currency1]))
    setCurrency1(currency1)
  }

  const handleAmount2Change = (amount2) => {
    setAmount1(formatNumber((amount2 * rates[currency1]) / rates[currency2]))
    setAmount2(amount2)
  }

  const handleCurrency2Change = (currency2) => {
    setAmount1(formatNumber((amount2 * rates[currency1]) / rates[currency2]))
    setCurrency2(currency2)
  }

  return (
    <div className="App">
      <Header eur={rates['UAH']} usd={usdAmount} />
      <h1>Currency Converter</h1>
      <CurrencyInput
        onAmountChange={handleAmount1Change}
        onCurrencyChange={handleCurrency1Change}
        currencies={Object.keys(rates)}
        amount={amount1}
        currency={currency1}
      />
      <CurrencyInput
        onAmountChange={handleAmount2Change}
        onCurrencyChange={handleCurrency2Change}
        currencies={Object.keys(rates)}
        amount={amount2}
        currency={currency2}
      />
    </div>
  )
}

export default App
