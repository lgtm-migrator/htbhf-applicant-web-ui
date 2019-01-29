const test = require('tape')
const { UK_POSTCODE_PATTERN } = require('./validate')

test('invalid postcode does not match regex', (t) => {
  const invalidPostcodes = [
    'AA1122BB',
    'A',
    '11AA21',
    '',
    'E!',
    'EA123'
  ]

  invalidPostcodes.forEach(function (postcode) {
    const match = postcode.match(UK_POSTCODE_PATTERN)
    t.equal(match, null)
  })

  t.end()
})

test('valid postcode matches regex', (t) => {
  const validPostcodes = [
    'EC11BB',
    'W1A0AX',
    'M11AE',
    'B338TH',
    'CR26XH',
    'DN551PT',
    'DN55 1PT'
  ]

  validPostcodes.forEach(function (postcode) {
    const match = postcode.match(UK_POSTCODE_PATTERN)
    t.deepEqual(match[0], postcode)
  })

  t.end()
})
