/**
 * @module helpers
 * All the helper functions needed in this project
 */

/**
 * Returns a new Promise that is resolved by a timer for the given milliseconds.
 * @param  { Int } ms - milliseconds
 * @returns { Promise } - a promise that is resolved by a timer
 */
export function delayOf(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Given the data and name, file is downloaded in the browser.
 * @param  { String } data - the file data
 * @param  { String } name - the file name
 */
export function downloadFile(data, name) {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([data]))
  a.download = name
  a.click()
  setTimeout(() => URL.revokeObjectURL(a.href), 500)
}

export default {delayOf, downloadFile}
