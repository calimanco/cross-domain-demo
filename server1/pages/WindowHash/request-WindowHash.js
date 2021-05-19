// eslint-disable-next-line no-unused-vars
function initHashListener() {
  const cbStore = {}
  const location = window.location
  const url = location.origin + location.pathname + location.search
  window.addEventListener('hashchange', function () {
    // Read hash
    const hash = window.location.hash
    // Clear hash
    if (hash && hash !== '#') {
      location.replace(url + '#')
    } else {
      return
    }
    const { callbackId, msg } = JSON.parse(
      decodeURIComponent(hash.replace('#', ''))
    )

    try {
      cbStore[callbackId]({
        msg
      })
    } finally {
      delete cbStore[callbackId]
    }
  })
  return {
    set: function (id, resolve) {
      cbStore[id] = function (data) {
        resolve(data)
      }
    }
  }
}

// Set hashListener
const hashListener = initHashListener()

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
      refererUrl:
        window.location.origin +
        window.location.pathname +
        window.location.search,
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
    hashListener.set(id, resolve)
    // Submit the form, which will initiate a request.
    form.submit()
  })
}
