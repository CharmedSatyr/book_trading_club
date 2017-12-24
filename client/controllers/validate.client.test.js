import { errMessage, locVal, passVal, userVal } from './validate.client.js'

describe('errMessage', () => {
  it('should return proper messages for "user", "pass", and "loc" or else return an empty String', () => {
    expect(errMessage(null)).toEqual('')
    expect(errMessage('user', true)).toEqual('')
    expect(errMessage('random #*')).toEqual('')
    expect(errMessage('user', false)).toEqual('Please use 1-40 letters and numbers.')
    expect(errMessage('pass', false)).toEqual(
      'Your password must include at least 8 letters, numbers, and special characters.'
    )
    expect(errMessage('loc', false)).toEqual(
      "Please use 1-100 letters. Don't include your street address or other personal information."
    )
  })
})

describe('locVal', () => {
  it('should return `true` if the input matches `regex.location` and `false` otherwise.', () => {
    expect(locVal(null)).toBe(false)
    expect(locVal('')).toBe(false)
    expect(locVal('Capitol Hill 20515')).toBe(false)
    expect(locVal('#2@WES3')).toBe(false)
    expect(locVal('Framingham, Massachusetts')).toBe(true)
    expect(locVal('Miami, Fla.')).toBe(true)
    expect(locVal('Apartment #3B, MA.'))
  })
})

describe('passVal', () => {
  it('should return `true` if the input matches `regex.password` and `false` otherwise.', () => {
    expect(passVal(null)).toBe(false)
    expect(passVal('')).toBe(false)
    expect(passVal('VeryVeryLongString')).toBe(false)
    expect(passVal('Password123')).toBe(false)
    expect(passVal('#2@WES3')).toBe(false)
    expect(passVal('%#*TESKL:H#EGSDLH2ssjksgh1208sh$')).toBe(true)
  })
})

describe('userVal', () => {
  it('should return `true` if the input matches `regex.username` and `false` otherwise.', () => {
    expect(userVal(null)).toBe(false)
    expect(userVal('')).toBe(false)
    expect(userVal('$Charmed (Satyr)')).toBe(false)
    expect(userVal('<Malicious_Worm/>')).toBe(false)
    expect(
      userVal(
        'Harry Potter and the Plains of Oblivion, Where He Will Surely Slaughtered By Dremora'
      )
    ).toBe(false)
    expect(userVal('CharmedSatyr')).toBe(true)
    expect(userVal('T-1000')).toBe(true)
    expect(userVal('J. R. R. Tolkien')).toBe(true)
    expect(userVal('Dr. Matthew Alexander VanLandingham, III')).toBe(true)
  })
})
