'use strict'

/*** REGEX ***/
import regex from '../../common/regex.js'

/*** FUNCTIONS ***/
export const errMessage = (field, good) => {
  switch (field) {
    case 'user':
      return good ? '' : 'Please use 1-40 letters and numbers.'
      break
    case 'pass':
      return good
        ? ''
        : 'Your password must include at least 8 letters, numbers, and special characters.'
      break
    case 'loc':
      return good
        ? ''
        : "Please use 1-100 letters. Don't include your street address or other personal information."
      break
    default:
      return ''
  }
}
//location err
export const locVal = loc => {
  if (loc && loc.match(regex.location)) {
    return true
  } else {
    return false
  }
}

//password err
export const passVal = pass => {
  if (pass && pass.match(regex.password)) {
    return true
  } else {
    return false
  }
}

//username err
export const userVal = user => {
  if (user && user.match(regex.username)) {
    return true
  } else {
    return false
  }
}

//Clear input fields on error
export const clearInput = state => {
  //Clear on signup if invalid; not visible during login
  if (state.locErr.length > 0) {
    document.getElementById('location').value = ''
  }
  //Clear field on login error or on signup if invalid
  if (state.loginErr || state.passErr.length > 0) {
    document.getElementById('password').value = ''
    //This applies to the new password field in the Profile section
    if (document.getElementById('passwordN')) {
      document.getElementById('passwordN').value = ''
    }
  }
  //Clear field on login error or on signup if invalid
  if (state.loginErr || state.userErr.length > 0) {
    document.getElementById('username').value = ''
  }
}
