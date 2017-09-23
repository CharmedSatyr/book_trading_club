'use strict'

export const f = async (method, url, cb1, cb2) => {
  try {
    const a = await fetch(url, { method: method })
    const b = await a.json()
    cb1(b)
  } catch (err) {
    return err
  } finally {
    if (cb2) {
      cb2()
    }
  }
}

const uniq = a => Array.from(new Set(a)) //Deduplicate
