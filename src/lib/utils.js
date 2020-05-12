export function setCookie (cookieName, value, expire = 'Session') {
  document.cookie = cookieName + '=' + escape(value) + '; expires=' + expire + ';'
}

export function getCookie (cookieName) {
  if (document.cookie.length > 0) {
    let cookieStart = document.cookie.indexOf(cookieName + '=')
    if (cookieStart !== -1) {
      cookieStart = cookieStart + cookieName.length + 1
      let cookieEnd = document.cookie.indexOf(';', cookieStart)
      if (cookieEnd === -1) {
        cookieEnd = document.cookie.length
      }
      return unescape(document.cookie.substring(cookieStart, cookieEnd))
    }
  }
  return ''
}

export function delCookie (cookieName) {
  this.setCookie(cookieName, '', -1)
}

export function UUID () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export function formatDate (time) {
  const date = new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // 月份是从0开始的
  const day = date.getDate()
  const hour = date.getHours()
  const min = date.getMinutes()
  const sec = date.getSeconds()
  var newTime = year + '-' +
              (month < 10 ? '0' + month : month) + '-' +
              (day < 10 ? '0' + day : day) + ' ' +
              (hour < 10 ? '0' + hour : hour) + ':' +
              (min < 10 ? '0' + min : min) + ':' +
              (sec < 10 ? '0' + sec : sec)
  return newTime
}
