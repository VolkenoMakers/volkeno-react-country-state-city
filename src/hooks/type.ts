/* eslint-disable camelcase */
export type OptionProps = {
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

export type StateOptions = {
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

export type CityOptions = {
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

export interface CountrySelectorProps {
  name?: string
  containerClass?: string
  styleContainer?: React.CSSProperties
  onChange?: (country: OptionProps) => any
  optionClass?: string
  value?: OptionProps
  placeholder?: string
  countriesIso?: string[] 
}

export interface StateSelectorProps {
  name?: string
  containerClass?: string
  styleContainer?: React.CSSProperties
  onChange?: (state: StateOptions) => any
  value?: OptionProps
  placeholder?: string
  countryPlaceholder?: string
  country?: OptionProps
}

export interface CitySelectorProps {
  name?: string
  containerClass?: string
  styleContainer?: React.CSSProperties
  onChange?: (city: CityOptions) => any
  value?: OptionProps
  placeholder?: string
  statePlaceholder?: string
  state?: StateOptions
}
