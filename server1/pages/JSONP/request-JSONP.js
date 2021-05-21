function initJSONPCallback() {
  const cbStore = {}
  return {
    run: function (statusCode, data) {
      const { callbackId, msg } = data
      try {
        // Process error
        if (statusCode.toString() !== '1') {
          cbStore[callbackId].reject(new Error(msg))
          return
        }
        // Process success
        cbStore[callbackId].resolve({ msg })
      } finally {
        delete cbStore[callbackId]
      }
    },
    set: function (callbackId, resolve, reject) {
      cbStore[callbackId] = {
        resolve,
        reject
      }
    },
    del: function (callbackId) {
      delete cbStore[callbackId]
    }
  }
}

// Set callback function
const JSONPCallback = initJSONPCallback()
window.JSONPCb = JSONPCallback.run

// eslint-disable-next-line no-unused-vars
function request(method = 'GET', url, data = null) {
  return new Promise((resolve, reject) => {
    const callbackId = (Math.floor(Math.random() * 10000) + 1).toString()
    if (method === 'GET' && data != null) {
      url +=
        '?' +
        // eslint-disable-next-line no-undef
        serializedParams(
          Object.assign({}, data, {
            callbackFn: 'JSONPCb',
            callbackId
          })
        )
    }
    // Create script tag
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    script.onerror = function (error) {
      // We cannot get accurate server status.
      JSONPCallback.del(callbackId)
      reject(error.message != null ? error : new Error('Network error.'))
    }
    // Set callback function
    JSONPCallback.set(callbackId, resolve, reject)
    // In actual use, the script tag needs to be removed after the request.
    document.body.appendChild(script)
  })
}
