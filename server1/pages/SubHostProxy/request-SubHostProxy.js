let initSubHostProxyPromise = null

function initSubHostProxy() {
  if (initSubHostProxyPromise != null) {
    return initSubHostProxyPromise
  }
  initSubHostProxyPromise = new Promise((resolve, reject) => {
    // Create iframe.
    // In actual use, the iframe needs to be hidden.
    const iframe = document.createElement('iframe')
    iframe.id = 'proxyIframe'
    // Link to proxy page.
    iframe.src = 'http://api.demo.com/SubHostProxy/proxyPage'
    iframe.onerror = function (error) {
      reject(error)
    }
    iframe.onload = function () {
      resolve(iframe)
    }
    // In actual use, the iframe tag needs to be removed after the request.
    document.body.appendChild(iframe)
  })
  return initSubHostProxyPromise
}

// eslint-disable-next-line no-undef
const event = new Event('request')

// eslint-disable-next-line no-unused-vars
function request(method = 'GET', url, data = null) {
  return initSubHostProxy()
    .then(iframe => {
      iframe.contentDocument.dispatchEvent(event)
      if (method === 'GET' && data != null) {
        // eslint-disable-next-line no-undef
        url += '?' + serializedParams(data)
      }
      return iframe.contentWindow.xhr({
        method,
        url,
        data
      })
    })
    .then(res => {
      return new Promise((resolve, reject) => {
        const { statusCode, data } = res
        const { msg } = data
        // Process error
        if (statusCode.toString() !== '1') {
          reject(new Error(msg))
          return
        }
        // Process success
        resolve({ msg })
      })
    })
}
