function initMockFormCallback() {
  const cbStore = {}
  return {
    run: function (id, data) {
      try {
        cbStore[id](JSON.parse(data))
      } finally {
        delete cbStore[id]
      }
    },
    set: function (id, resolve) {
      cbStore[id] = function (data) {
        resolve(data)
      }
    }
  }
}

// Set callback function
const MockFormCallback = initMockFormCallback()
window.MFCb = MockFormCallback.run

// eslint-disable-next-line no-unused-vars
function request(method = 'GET', url, data = null) {
  return new Promise((resolve, reject) => {
    const id = (Math.floor(Math.random() * 10000) + 1).toString()
    // Create iframe.
    // In actual use, the iframe needs to be hidden.
    const iframe = document.createElement('iframe')
    iframe.name = id
    iframe.onerror = function (error) {
      reject(error)
    }
    // Create form.
    const form = document.createElement('form')
    form.action = url
    form.method = method
    form.target = id
    form.hidden = true
    // Add data.
    const finalData = Object.assign({}, data, {
      callbackFn: 'MFCb',
      callbackId: id
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
    MockFormCallback.set(id, resolve)
    // Submit the form, which will initiate a request.
    form.submit()
  })
}
