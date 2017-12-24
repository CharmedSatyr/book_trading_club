'use strict'

//The same regex is used in both client and
//server side validation
const regex = {
  //Locations can't include numbers or most special characters and must be 1-100 characters
  location: /^[a-zA-Z\,\-\.\ ]{1,100}$/,
  //passwords should include at least 8 letters, numbers, and special characters
  password: /(?=.*[a-zA-Z]+)(?=.*[0-9]+)(?=.*[^a-zA-Z0-9]+).{8,}/,
  //Usernames can't include anything that's not a letter, number, or permitted special character and must be 1-40 characters
  username: /^[A-Za-z0-9\-\.\,\ ]{1,40}$/
}

export default regex
