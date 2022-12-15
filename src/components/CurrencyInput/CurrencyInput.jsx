import PropTypes from 'prop-types'
import './currencyInput.css'

function CurrencyInput(props) {
  return (
    <div className='group'>
      <input type="text" value={props.amount} onChange={(e) => props.onAmountChange(e.target.value)} />
      <select value={props.currency} onChange={(e) => props.onCurrencyChange(e.target.value)}>
        {props.currencies.map((currency, id) => 
          <option key={id} value={currency}>{currency}</option>
          )}
      </select>
    </div>
  )
}

CurrencyInput.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.array,
  onAmountChange: PropTypes.func,
  onCurrencyChange: PropTypes.func, 
}

export default CurrencyInput