/*
 * Regex for matching UK postcodes matching BS7666 format.
 * see https://www.gov.uk/government/publications/bulk-data-transfer-for-sponsors-xml-schema  The format is in the file BulkDataCommon-v2.1.xsd
 * see https://stackoverflow.com/questions/164979/uk-postcode-regex-comprehensive
 */
const UK_POSTCODE_PATTERN = /^(GIR ?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]([0-9ABEHMNPRV-Y])?)|[0-9][A-HJKPS-UW]) ?[0-9][ABD-HJLNP-UW-Z]{2})$/

const CHANNEL_ISLANDS_AND_IOM_POSTCODE_PATTERN = /^([Gg][Yy]|[Jj][Ee]|[Ii][Mm])/

const OS_PLACES_ADDRESS_KEYS = [
  'ADDRESS',
  'ORGANISATION_NAME',
  'SUB_BUILDING_NAME',
  'BUILDING_NAME',
  'BUILDING_NUMBER',
  'DEPENDENT_THOROUGHFARE_NAME',
  'THOROUGHFARE_NAME',
  'DOUBLE_DEPENDENT_LOCALITY',
  'DEPENDENT_LOCALITY',
  'POST_TOWN',
  'POSTCODE',
  'LOCAL_CUSTODIAN_CODE_DESCRIPTION',
  'UDPRN'
]

const ADDRESS_LINE_1_KEY = 'addressLine1'
const ADDRESS_LINE_2_KEY = 'addressLine2'
const TOWN_OR_CITY_KEY = 'townOrCity'
const COUNTY_KEY = 'county'
const POSTCODE_KEY = 'postcode'

const ADDRESS_KEYS = [ADDRESS_LINE_1_KEY, ADDRESS_LINE_2_KEY, TOWN_OR_CITY_KEY, COUNTY_KEY, POSTCODE_KEY]

module.exports = {
  UK_POSTCODE_PATTERN,
  OS_PLACES_ADDRESS_KEYS,
  CHANNEL_ISLANDS_AND_IOM_POSTCODE_PATTERN,
  ADDRESS_KEYS
}
