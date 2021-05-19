function initJSONPCallback() {
  const cbStore = {}
  return {
    run: function (id, data) {
      try {
        cbStore[id](data)
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
const JSONPCallback = initJSONPCallback()
window.JSONPCb = JSONPCallback.run

// eslint-disable-next-line no-unused-vars
function request(url) {
  return new Promise(resolve => {
    const id = (Math.floor(Math.random() * 10000) + 1).toString()
    const fullUrl = url.includes('?')
      ? `${url}&cbName=JSONPCb&cbId=${id}`
      : `${url}?cbName=JSONPCb&cbId=${id}`
    // Create script tag
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = fullUrl
    // Set callback function
    JSONPCallback.set(id, resolve)
    // In actual use, the script tag needs to be removed after the request.
    document.body.appendChild(script)
  })
}
