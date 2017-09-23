import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const style = {
  margin: 12
}

const Input = ({
  id,
  h3class,
  label,
  placeholder,
  type,
  btnclass,
  fn,
  btnText
}) => {
  return (
    <label htmlFor={id}>
      <h3 className={h3class}>{label}</h3>
      <TextField id={id} hintText={placeholder} />
      <RaisedButton label={btnText} primary={true} style={style} onClick={fn} />
    </label>
  )
}

export default Input
