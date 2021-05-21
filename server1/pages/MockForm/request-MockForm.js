function initMockFormCallback() {
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
const MockFormCallback = initMockFormCallback()
window.MFCb = MockFormCallback.run

// eslint-disable-next-line no-unused-vars
function request(method = 'GET', url, data = null) {
  return new Promise((resolve, reject) => {
    const callbackId = (Math.floor(Math.random() * 10000) + 1).toString()
    // Create iframe.
    // In actual use, the iframe needs to be hidden.
    const iframe = document.createElement('iframe')
    iframe.name = callbackId
    iframe.onload = function (event) {
      // We cannot get accurate server status.
      if (event.target.contentWindow.length === 0) {
        MockFormCallback.del(callbackId)
        reject(new Error('Network error.'))
      }
    }
    // Create form.
    const form = document.createElement('form')
    form.action = url
    form.method = method
    form.target = callbackId
    form.hidden = true
    // Add data.
    const finalData = Object.assign({}, data, {
      callbackFn: 'MFCb',
      callbackId
    })
    for (const i of Object.keys(finalData)) {
      const inputElement = document.createElement('input')
      inputElement.name = i
      inputElement.value = finalData[i]
      form.appendChild(inputElement)
    }
    // In actual use, the iframe tag and form tag needs to be removed after the request.
    document.body.appendChild(iframe)
    document.body.appendChild(form)
    // Set callback function
    MockFormCallback.set(callbackId, resolve, reject)
    // Submit the form, which will initiate a request.
    form.submit()
  })
}
