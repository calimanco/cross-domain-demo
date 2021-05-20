let initPostMessagePromise = null
const targetOrigin = 'http://api.demo.com'

function initPostMessage() {
  if (initPostMessagePromise != null) {
    return initPostMessagePromise
  }
  initPostMessagePromise = new Promise((resolve, reject) => {
    // Create iframe.
    // In actual use, the iframe needs to be hidden.
    const iframe = document.createElement('iframe')
    iframe.id = 'proxyIframe'
    // Link to proxy page.
    iframe.src = 'http://api.demo.com/PostMessage/proxyPage'
    iframe.onerror = function (error) {
      reject(error)
    }
    iframe.onload = function () {
      resolve(iframe)
    }
    // In actual use, the iframe tag needs to be removed after the request.
    document.body.appendChild(iframe)
  })
  return initPostMessagePromise
}

function initMessageListener() {
  const cbStore = {}
  window.addEventListener('message', function (event) {
    if (event.origin !== targetOrigin) {
      return
    }
    const { msgId, errMsg, msg } = event.data

    if (errMsg != null && errMsg !== '') {
      cbStore[msgId].reject(new Error(errMsg))
    }

    try {
      cbStore[msgId].resolve({
        msg
      })
    } finally {
      delete cbStore[msgId]
    }
  })
  return {
    set: function (msgId, resolve, reject) {
      cbStore[msgId] = {
        resolve,
        reject
      }
    }
  }
}

// Set messageListener
const messageListener = initMessageListener()

// eslint-disable-next-line no-unused-vars
function request(method = 'GET', url, data = null) {
  return initPostMessage().then(iframe => {
    return new Promise((resolve, reject) => {
      const id = (Math.floor(Math.random() * 10000) + 1).toString()
      if (method === 'GET' && data != null) {
        // eslint-disable-next-line no-undef
        url += '?' + serializedParams(data)
      }
      iframe.contentWindow.postMessage(
        {
          msgId: id,
          method,
          url,
          data
        },
        targetOrigin
      )
      messageListener.set(id, resolve, reject)
    })
  })
}
