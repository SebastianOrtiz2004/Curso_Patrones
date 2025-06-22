import { useEffect, useState } from 'react'
import Countries from './components/Countries'
import countriesService from './services/countries'

function App() {
  const [countries, setCountries] = useState(null)
  const [filter, setFilterValue] = useState('')

  useEffect(() => {
    countriesService.getAllCountries()
      .then(countriesInit => setCountries(countriesInit))
      .catch(error => console.error(error))
  }, [])

  const countriesFiltered = (filter && countries)
    ? countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    : countries

  const handleShowCountry = (country) => {
    setFilterValue(country.name.common)
  }

  return (
    <>
      <div>
        find countries:
        <input type="text" value={filter} onChange={e => setFilterValue(e.target.value)} />
      </div>
      <Countries countries={countriesFiltered} onCountryClick={handleShowCountry} />
    </>
  )
}

export default App
