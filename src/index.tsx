/* eslint-disable camelcase */
import * as React from 'react'
import Select from 'react-select'
import axios from 'axios'
import styles from './styles.module.css'
import CountriesJson from './DataJson/Countries.json'

import {
  CityOptions,
  CitySelectorProps,
  CountrySelectorProps,
  OptionProps,
  StateOptions,
  StateSelectorProps
} from './hooks/type'

let allStates: any = []
let allCities: any = []
let cities: any = []
let states: any = []
let selectedState: StateOptions | any = ''
let selectedCity: CityOptions | any = ''

axios
  .get(
    'https://raw.githubusercontent.com/mbaye19/country-data/main/States.json'
  )
  .then((response: any) => {
    allStates = response?.data
  })
  .catch((err: any) => {
    console.log('err', err)
    // loading = false
  })

axios
  .get(
    'https://raw.githubusercontent.com/mbaye19/country-data/main/Cities.json'
  )
  .then((response: any) => {
    allCities = response?.data
  })
  .catch((err: any) => {
    console.log('err', err)
  })

export const CountrySelector = (props: CountrySelectorProps) => {
  const {
    name,
    containerClass,
    styleContainer,
    onChange,
    optionClass,
    value,
    placeholder,
    countriesIso
  } = props
  let countries = CountriesJson
  if(countriesIso){
    countries = CountriesJson.filter(country => countriesIso.includes(country?.iso2)).map((country) => {
      return {
        value: country.iso2,
        label: (
          <div className={`${styles.label}${optionClass}`}>
            <img
              src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.iso2}.svg`}
              alt='flag'
              className={styles.flag}
            />
            <span className={styles.countryName}>{country.name}</span>
          </div>
        ),
        ...country
      }
    })
  } else {
  countries = CountriesJson.map((country) => {
    return {
      value: country.iso2,
      label: (
        <div className={`${styles.label}${optionClass}`}>
          <img
            src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.iso2}.svg`}
            alt='flag'
            className={styles.flag}
          />
          <span className={styles.countryName}>{country.name}</span>
        </div>
      ),
      ...country
    }
  })
}
    
  

  let selectedOption: OptionProps | any = ''

  const filterOptions = (
    candidate: { label: string; value: string; data: any },
    input: string
  ) => {
    if (input) {
      return candidate?.data?.name
        ?.toLowerCase()
        ?.includes(input?.toLowerCase())
    }
    return true
  }

  const handleSelectChange = (option: OptionProps) => {
    selectedState = null
    selectedCity = null
    selectedOption = option
    if (onChange && onChange !== undefined) {
      onChange(option)
    }
  }

  let styleProps: React.CSSProperties | any = null

  if (styleContainer) {
    styleProps = {
      ...styleProps,
      styleContainer
    }
  }

  return (
    <div
      className={`${styles.selectContainer}${
        containerClass && containerClass !== undefined ? containerClass : ''
      }`}
      style={styleProps}
    >
      {' '}
      <Select
        className={styles.selectClass}
        classNamePrefix='select'
        key='country'
        isClearable
        isSearchable
        name={`${name && name !== undefined ? name : 'country'}`}
        onChange={handleSelectChange}
        options={countries}
        filterOption={filterOptions}
        defaultValue={value && value !== undefined ? value : selectedOption}
        placeholder={`${
          placeholder && placeholder !== undefined
            ? placeholder
            : 'Select country'
        }`}
      />
    </div>
  )
}

export const StateSelector = (props: StateSelectorProps) => {
  const {
    name,
    containerClass,
    styleContainer,
    onChange,
    value,
    placeholder,
    countryPlaceholder,
    country
  } = props

  if (country?.value) {
    states = allStates
      ?.filter((item: StateOptions) => item?.country_code === country?.value)
      ?.map((state: StateOptions) => {
        return {
          value: state?.state_code,
          label: state?.name,
          ...state
        }
      })
  } else {
    states = []
  }

  const handleSelectChange = (option: StateOptions) => {
    selectedCity = null
    selectedState = option
    if (onChange && onChange !== undefined) {
      onChange(option)
    }
  }

  let styleProps: React.CSSProperties | any = null

  if (styleContainer) {
    styleProps = {
      ...styleProps,
      styleContainer
    }
  }

  if (value && value !== undefined && selectedState !== null) {
    selectedState = value
  }

  return (
    <div
      className={`${styles.selectContainer}${
        containerClass && containerClass !== undefined ? containerClass : ''
      }`}
      style={styleProps}
    >
      {' '}
      <Select
        className={styles.selectClass}
        classNamePrefix='select'
        isClearable
        isSearchable
        key='state'
        name={`${name && name !== undefined ? name : 'state'}`}
        onChange={handleSelectChange}
        options={states}
        value={selectedState}
        placeholder={`${
          country?.value
            ? placeholder && placeholder !== undefined
              ? placeholder
              : 'Select state'
            : countryPlaceholder && countryPlaceholder !== undefined
            ? countryPlaceholder
            : 'Select country'
        }`}
      />
    </div>
  )
}

export const CitySelector = (props: CitySelectorProps) => {
  const {
    name,
    containerClass,
    styleContainer,
    onChange,
    value,
    placeholder,
    statePlaceholder,
    state
  } = props

  if (state?.value) {
    cities = allCities
      ?.filter(
        (item: CityOptions) =>
          item?.country_code === state?.country_code &&
          item?.state_code === state?.state_code
      )
      ?.map((city: any) => {
        return {
          value: city?.name,
          label: city?.name,
          ...city
        }
      })
  } else {
    cities = []
  }
  const handleSelectChange = (option: CityOptions) => {
    selectedCity = option
    if (onChange && onChange !== undefined) {
      onChange(option)
    }
  }

  let styleProps: React.CSSProperties | any = null

  if (styleContainer) {
    styleProps = {
      ...styleProps,
      styleContainer
    }
  }

  if (value && value !== undefined && selectedCity !== null) {
    selectedCity = value
  }

  return (
    <div
      className={`${styles.selectContainer}${
        containerClass && containerClass !== undefined ? containerClass : ''
      }`}
      style={styleProps}
    >
      {' '}
      <Select
        className={styles.selectClass}
        classNamePrefix='select'
        isClearable
        key='city'
        isSearchable
        name={`${name && name !== undefined ? name : 'city'}`}
        onChange={handleSelectChange}
        options={cities}
        value={selectedCity || ''}
        placeholder={`${
          state?.value
            ? placeholder && placeholder !== undefined
              ? placeholder
              : 'Select city'
            : statePlaceholder && statePlaceholder !== undefined
            ? statePlaceholder
            : 'Select state'
        }`}
      />
    </div>
  )
}
