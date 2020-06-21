import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ countryFilter, setCountryFilter }) => {

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setCountryFilter(event.target.value)
  }

  return (
    <div>
      <form>
        <div>
          find countries <input value={countryFilter} onChange={handleFilterChange} />
        </div>
      </form>
    </div>
  )
}

const Countries = ({ countries, countryFilter, setCountryFilter, weather, setWeather }) => {
  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(countryFilter.toLowerCase()))

  if (filteredCountries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  if (filteredCountries.length === 1) {
    return (
      <div>
        <CountryDetail country={filteredCountries[0]} weather={weather} setWeather={setWeather} />
      </div>
    )
  }

  return (
    <div>
      {filteredCountries.map(country => <Country key={country.alpha3Code} country={country} setCountryFilter={setCountryFilter} />)}
    </div>
  )
}

const Country = ({ country, setCountryFilter }) => {

  const clickHandler = (event) => {
    event.preventDefault()
    setCountryFilter(country.name)
    console.log("button show", country.name)
  }

  return <div>{country.name} <button type="submit" onClick={clickHandler}>show</button></div>
}

const CountryDetail = ({ country, weather, setWeather }) => {

  useEffect(() => {
    console.log('get weather')
    axios
      .get(`https://samples.openweathermap.org/data/2.5/weather?q=${country.name}&appid=439d4b804bc8187953eb36d2a8c26a02`)
      .then(response => {
        console.log('promise fulfilled')
        setWeather(response.data)
        console.log("weather", weather.weather)
      })
  }, [])
  // incomplete here, just fill in a valid service and api key

  return (
    <div>
      <h1>{country.name}</h1>
      capital {country.capital}<br />
      population {country.population}
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
      </ul>
      <img src={country.flag} height='100'></img>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')
  const [weather, setWeather] = useState('')

  useEffect(() => {
    console.log('get countries')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  // console.log('render', countries.length, 'countries')

  return (
    <div>
      <Filter countryFilter={countryFilter} setCountryFilter={setCountryFilter} />
      <Countries countries={countries} countryFilter={countryFilter} setCountryFilter={setCountryFilter} weather={weather} setWeather={setWeather} />
    </div>
  )
}

export default App