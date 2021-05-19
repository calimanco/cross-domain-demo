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
    iframe.onload = function () {
      const name = iframe.contentWindow.name
      if (name) {
        try {
          // eslint-disable-next-line no-undef
          console.log(decodeURIComponent(name))
          const result = JSON.parse(decodeURIComponent(name))
          resolve(result)
        } catch (err) {
          reject(err)
        }
      }
    }
    // Create form.
    const form = document.createElement('form')
    form.action = url
    form.method = method
    form.target = id
    form.hidden = true
    // Add data.
    const finalData = Object.assign({}, data, {
      redirect: window.location.origin + '/WindowName/emptyPage.html'
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
    // Submit the form, which will initiate a request.
    form.submit()
  })
}
