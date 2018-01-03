'use strict'

//This object is used in both client and server side validation and tests
const validation = {
  location: {
    err:
      "Please use 1-100 letters. Don't include your street address or other personal information.",
    hint: 'City and state or province',
    label: 'Location',
    //Locations can't include numbers or most special characters and must be 1-100 characters
    regex: /^[a-zA-Z\,\-\.\ ]{1,100}$/
  },
  password: {
    err: {
      description:
        'Please use at least 8 characters, including at least 1 number, 1 uppercase or lowercase letter, and 1 special character.',
      vague: 'Something went wrong. Please try again.'
    },
    label: {
      change: '',
      first: 'Create a password',
      login: 'Enter your password'
    },
    hint: 'Use at least 8 characters, including a number, a letter, and punctuation.',
    //passwords should include at least 8 letters, numbers, and special characters
    regex: /(?=.*[a-zA-Z]+)(?=.*[0-9]+)(?=.*[^a-zA-Z0-9]+).{8,}/
  },
  username: {
    err: {
      first: 'Please use 1-40 letters and numbers.',
      used: 'This username is already in use. Please choose another one.'
    },
    label: {
      first: 'Choose your username',
      login: 'Enter your username'
    },
    hint: 'Your username will be public.',
    //Usernames can't include anything that's not a letter, number, or permitted special character and must be 1-40 characters
    regex: /^[A-Za-z0-9\-\.\,\ ]{1,40}$/
  }
}

export default validation
