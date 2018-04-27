const fetch = (url, params) => {
  let xhr = new XMLHttpRequest()
  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText))
        } else {
          reject({success: false})
        }
      }
    }
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
    xhr.send(`Logic=${params.logic}&Name=${params.name}&Data=${JSON.stringify(params.data)}`)
  })
}

let options = {
  timeout: 40000,
  mode: 'cors'
}

export default {
  fxhy: {
    list (params) {
      return fetch(`/Mobile-PostAPI`, params, options)
    },
    wxjssdk () {
      return fetch(`/Admin-GetAuthorize`, {}, options)
    }
  }
}
