// eslint-disable-next-line no-unused-vars
function xhr(config) {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'GET',
      headers = {},
      responseType = 'json',
      timeout = 60000,
      withCredentials
    } = config
    // eslint-disable-next-line no-undef
    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    if (withCredentials) {
      request.withCredentials = withCredentials
    }

    request.open(method.toUpperCase(), url, true)

    Object.keys(headers).forEach(name => {
      if (data == null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    if (data != null) {
      request.setRequestHeader('Content-Type', 'application/json')
    }

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        // 非4就是非完成的状态
        return
      }

      if (request.status === 0) {
        return
      }

      resolve({
        status: request.status,
        statusText: request.statusText,
        response: request.response || {}
      })
    }

    request.onerror = function handleError() {
      reject(new Error('Network Error'))
    }

    request.ontimeout = function handleTimeout() {
      reject(new Error('Timeout'))
    }

    request.send(JSON.stringify(data))
  })
}
