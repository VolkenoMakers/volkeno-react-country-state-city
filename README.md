# volkeno-react-country-state-city

> This library provides React components to display dropdowns of connected countries, states and cities (choose a country, it displays the affected states, choose a state, it has displays the affected cities).

![Single select](https://raw.githubusercontent.com/VolkenoMakers/volkeno-react-country-state-city/main/src/utils/demo.gif)

[![NPM](https://img.shields.io/npm/v/volkeno-react-country-state-city.svg)](https://www.npmjs.com/package/volkeno-react-country-state-city) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save volkeno-react-country-state-city
```

## Usage

```tsx
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
```

## Configuration - Props

# <CountrySelector/>

| Property                 |   Type              | Require  |  Default | Description                                                                     |
| ------------------------ | :-----------------: | :-------:| :-------:| :------------------------------------------------------------------------------ |
| variant                  | string              |  true    | ...      | Skeleton type (circle, rect, text)                                              |
| width                    | string or number    |  false   | 100px    | The width of the skeleton                                                       |
| height                   | string or number    |  false   | 100px    | The height of each skeleton line                                                |
| borderRadius             | string or number    |  false   | 10px     | The border radius of the skeleton                                               |
| style                    | React.CSSProperties |  false   | ...      | Apply a style to your skeleton                                                  |
| count                    | number              |  false   | 1        | The number of lines of skeletons to render.                                     |
| className                | string              |  false   | ...      |  A custom class name for the individual skeleton elements  

## License

MIT © [VolkenoMakers](https://github.com/VolkenoMakers)
