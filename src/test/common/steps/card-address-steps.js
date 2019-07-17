const { When, Then } = require('cucumber')

const pages = require('./pages')
const { enterAddressAndSubmit } = require('./common-steps')
const { assertFieldErrorAndLinkTextPresentAndCorrect, assertErrorHeaderTextPresent } = require('./common-assertions')
const { LONG_STRING, BLANK_STRING } = require('./constants')

const VALID_ADDRESS_LINE_1 = 'Flat b'
const VALID_ADDRESS_LINE_2 = '221 Baker street'
const VALID_TOWN_OR_CITY = 'London'
const VALID_POSTCODE = 'AA1 1AA'

When(/^I enter an address with postcode (.*)$/, async function (postcode) {
  await enterAddressAndSubmit(VALID_ADDRESS_LINE_1, VALID_ADDRESS_LINE_2, VALID_TOWN_OR_CITY, postcode)
})

When(/^I do not enter the first line of an address$/, async function () {
  await enterAddressAndSubmit(BLANK_STRING, VALID_ADDRESS_LINE_2, VALID_TOWN_OR_CITY, VALID_POSTCODE)
})

When(/I do not enter the 'town or city' of an address$/, async function () {
  await enterAddressAndSubmit(VALID_ADDRESS_LINE_1, VALID_ADDRESS_LINE_2, BLANK_STRING, VALID_POSTCODE)
})

When(/^I enter in an address where the first line is too long$/, async function () {
  await enterAddressAndSubmit(LONG_STRING, VALID_ADDRESS_LINE_2, VALID_TOWN_OR_CITY, VALID_POSTCODE)
})

When(/^I enter in an address where the second line is too long$/, async function () {
  await enterAddressAndSubmit(VALID_ADDRESS_LINE_1, LONG_STRING, VALID_TOWN_OR_CITY, VALID_POSTCODE)
})

When(/^I enter in an address where the 'town or city' is too long$/, async function () {
  await enterAddressAndSubmit(VALID_ADDRESS_LINE_1, VALID_ADDRESS_LINE_2, LONG_STRING, VALID_POSTCODE)
})

When(/^I do not enter the second line of an address$/, async function () {
  await enterAddressAndSubmit(VALID_ADDRESS_LINE_1, BLANK_STRING, VALID_TOWN_OR_CITY, VALID_POSTCODE)
})

When(/^I do not enter in any address fields$/, async function () {
  await enterAddressAndSubmit(BLANK_STRING, BLANK_STRING, BLANK_STRING, BLANK_STRING)
})

Then(/^I am shown the address page$/, async function () {
  await pages.address.waitForPageLoad()
})

Then(/^I am informed that the postcode is in the wrong format$/, async function () {
  await assertErrorHeaderTextPresent(pages.address)
  await assertPostcodeErrorFieldAndLink('Enter a correct postcode, like AA1 1AA')
})

Then(/^I am informed that I need to enter an address on the 'address line 1' field$/, async function () {
  await assertErrorHeaderTextPresent(pages.address)
  await assertAddressLine1ErrorFieldAndLink('Tell us your address')
})

Then(/^I am informed that I need to enter an address on the 'town or city' field$/, async function () {
  await assertErrorHeaderTextPresent(pages.address)
  await assertTownOrCityErrorFieldAndLink('Tell us your address')
})

Then(/^I am informed that the first line of the address is too long$/, async function () {
  await assertErrorHeaderTextPresent(pages.address)
  await assertAddressLine1ErrorFieldAndLink('The information you entered is too long')
})

Then(/^I am informed that the second line of the address is too long$/, async function () {
  await assertErrorHeaderTextPresent(pages.address)
  await assertAddressLine2ErrorFieldAndLink('The information you entered is too long')
})

Then(/^I am informed that the 'town or city' of the address is too long$/, async function () {
  await assertErrorHeaderTextPresent(pages.address)
  await assertTownOrCityErrorFieldAndLink('The information you entered is too long')
})

Then(/^I am informed that I need to enter an address on the 'address line 1', 'address line 2' and 'town or city' fields$/, async function () {
  await assertErrorHeaderTextPresent(pages.address)
  await assertAddressLine1ErrorFieldAndLink('Tell us your address')
  await assertTownOrCityErrorFieldAndLink('Tell us your address')
  await assertPostcodeErrorFieldAndLink('Enter a correct postcode, like AA1 1AA')
})

const assertAddressLine1ErrorFieldAndLink = async (expectedErrorMessage) => {
  await assertFieldErrorAndLinkTextPresentAndCorrect(
    pages.address.getAddressLine1FieldErrorId(),
    pages.address.getAddressLine1ErrorLinkCss(),
    expectedErrorMessage)
}

const assertAddressLine2ErrorFieldAndLink = async (expectedErrorMessage) => {
  await assertFieldErrorAndLinkTextPresentAndCorrect(
    pages.address.getAddressLine2FieldErrorId(),
    pages.address.getAddressLine2ErrorLinkCss(),
    expectedErrorMessage)
}

const assertTownOrCityErrorFieldAndLink = async (expectedErrorMessage) => {
  await assertFieldErrorAndLinkTextPresentAndCorrect(
    pages.address.getTownOrCityFieldErrorId(),
    pages.address.getTownOrCityErrorLinkCss(),
    expectedErrorMessage)
}

const assertPostcodeErrorFieldAndLink = async (expectedErrorMessage) => {
  await assertFieldErrorAndLinkTextPresentAndCorrect(
    pages.address.getPostcodeFieldErrorId(),
    pages.address.getPostcodeErrorLinkCss(),
    expectedErrorMessage)
}
