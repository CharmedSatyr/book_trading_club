'use strict'

/*** REGEX ***/
import validation from '../../common/validation.js'

/*** FUNCTIONS ***/
export const errMessage = (field, good) => {
  switch (field) {
    case 'loc':
      return good ? '' : validation.location.err
      break
    case 'pass':
      return good ? '' : validation.password.err.description
      break
    case 'user':
      return good ? '' : validation.username.err.first
      break

    default:
      return ''
  }
}
//location err
export const locVal = loc => {
  if (loc && loc.match(validation.location.regex)) {
    return true
  } else {
    return false
  }
}

//password err
export const passVal = pass => {
  if (pass && pass.match(validation.password.regex)) {
    return true
  } else {
    return false
  }
}

//username err
export const userVal = user => {
  if (user && user.match(validation.username.regex)) {
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
