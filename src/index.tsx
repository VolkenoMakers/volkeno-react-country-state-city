/* eslint-disable camelcase */
import * as React from 'react'
import Select from 'react-select'
import axios from 'axios'
import styles from './styles.module.css'
import CountriesJson from './DataJson/Countries.json'

type OptionProps = {
  id: number
  name: string
  iso3: string
  iso2: string
  numeric_code: string | number
  phone_code: number | string
  capital: string
  currency: string
  currency_name: string
  currency_symbol: string
  tld: string
  native: string
  region: string
  subregion: string
  timezones: string
  latitude: string
  longitude: string
  emoji: string
  emojiU: string
  label: string | any
  value: string
}

type StateOptions = {
  id: number
  name: string
  country_id: number
  country_code: string
  country_name: string
  state_code: string
  type: string
  latitude: string | number
  longitude: string | number
  label?: string
  value?: string
}

type CityOptions = {
  id: number
  name: string
  state_id: number
  state_code: string
  state_name: string
  country_id: number
  country_code: string
  country_name: string
  latitude: string | number
  longitude: string | number
  wikiDataId: string
  label: string
  value: string
}

interface CountrySelectorProps {
  name?: string
  containerClass?: string
  styleContainer?: React.CSSProperties
  onChange?: (country: OptionProps) => any
  optionClass?: string
  value?: OptionProps
  placeholder?: string
}

interface StateSelectorProps {
  name?: string
  containerClass?: string
  styleContainer?: React.CSSProperties
  onChange?: (state: StateOptions) => any
  value?: OptionProps
  placeholder?: string
  countryPlaceholder?: string
  country?: OptionProps
}

interface CitySelectorProps {
  name?: string
  containerClass?: string
  styleContainer?: React.CSSProperties
  onChange?: (city: CityOptions) => any
  value?: OptionProps
  placeholder?: string
  statePlaceholder?: string
  state?: StateOptions
}

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
  .then((response) => {
    allStates = response?.data
  })
  .catch((err) => {
    console.log('err', err)
    // loading = false
  })

axios
  .get(
    'https://raw.githubusercontent.com/mbaye19/country-data/main/Cities.json'
  )
  .then((response) => {
    allCities = response?.data
  })
  .catch((err) => {
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
    placeholder
  } = props
  const countries = CountriesJson.map((country) => {
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
