// eslint-disable-next-line no-unused-vars
function request(method = 'GET', url, data = null, headers = {}) {
  if (method === 'GET' && data != null) {
    // eslint-disable-next-line no-undef
    url += '?' + serializedParams(data)
    data = null
  }
  if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
    // eslint-disable-next-line no-undef
    data = serializedParams(data)
  }
  // eslint-disable-next-line no-undef
  return xhr({
    method,
    url,
    data,
    headers
  }).then(res => {
    return new Promise((resolve, reject) => {
      const { status, statusText, response } = res
      const { statusCode, data } = response
      // Process error
      if (status.toString() !== '200') {
        reject(new Error(statusText))
        return
      }
      if (statusCode.toString() !== '1') {
        reject(new Error(data.msg))
        return
      }
      // Process success
      resolve({ msg: data.msg })
    })
  })
}
