import './header.css'

function Header({ eur, usd }) {
  return (
      <header className="header">
        <p>EUR: {(eur)?.toFixed(1)}</p>
         <p>USD: {(usd)?.toFixed(1)}</p>
    </header>
  )
}

export default Header