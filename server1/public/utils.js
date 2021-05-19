const toString = Object.prototype.toString

function isDate(val) {
  return toString.call(val) === '[object Date]'
}

function isPlainObject(val) {
  return toString.call(val) === '[object Object]'
}

function encode(val) {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

// eslint-disable-next-line no-unused-vars
function logTyping(str) {
  const logContainer = document.getElementsByClassName('log-container')[0]
  const p = document.createElement('p')
  p.innerText = str
  p.className = 'log-container-text'
  logContainer.appendChild(p)
  logContainer.scrollTop = logContainer.scrollHeight
}

// eslint-disable-next-line no-unused-vars
function serializedParams(params) {
  const parts = []

  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  return parts.join('&')
}

function queryStrToObj(str) {
  const result = {}
  const queryList = str.split('&')
  for (const query of queryList) {
    const [key, value] = query.split('=')
    result[key] = value
  }
  return result
}
