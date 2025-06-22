const Countries = ({ countries, onCountryClick }) => {
  if (!countries) return <div>Without countries found, try typing something</div>;

  if (countries.length > 10) return <div>Too many matches, specify another filter</div>;

  if (countries.length === 1) {
    const country = countries[0];
    console.log(country)
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      </div>
    );
  }

  return (
    <ul>
      {countries.map(country => (
        <li key={country.cca3}>
          {country.name.common}
          <button onClick={() => onCountryClick(country)}>show</button>
        </li>
      ))}
    </ul>
  );
}

export default Countries;