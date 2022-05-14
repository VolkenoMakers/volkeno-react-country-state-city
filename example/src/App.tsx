import React, { useState } from 'react'
import {
  CountrySelector,
  StateSelector,
  CitySelector
} from 'volkeno-react-country-state-city'
import 'volkeno-react-country-state-city/dist/index.css'

const App = () => {
  const [country, setCountry] = useState<any>('')
  const [state, setState] = useState<any>('')
  const [city, setCity] = useState<any>('')

  const handleCountrySelect = (option: any) => {
    setCountry(option)
  }

  const handleStateSelect = (option: any) => {
    setState(option)
  }

  const handleCitySelect = (option: any) => {
    setCity(option)
  }
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid grey', margin: '5rem'}}>
      <CountrySelector
        onChange={handleCountrySelect}
        name='country'
        placeholder='Select a country'
        value={country}
      />
      <StateSelector
        country={country}
        name='state'
        value={state}
        countryPlaceholder='Select a country first'
        onChange={handleStateSelect}
      />
      <CitySelector
        state={state}
        name='city'
        value={city}
        statePlaceholder='Select a state first'
        onChange={handleCitySelect}
      />
    </div>
  )
}

export default App
