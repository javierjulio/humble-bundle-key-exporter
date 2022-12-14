/**
 * Returns a new Promise that is resolved by a timer for the given milliseconds.
 * @param  { Number } ms - milliseconds
 * @returns { Promise } - a promise that is resolved by a timer
 */
export function delayOf(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Given the blob data and file name, the file is downloaded in the browser.
 * @param  { String } data - the blob data
 * @param  { String } name - the file name
 */
export function downloadFile(data, name) {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([data]))
  a.download = name
  a.click()
  setTimeout(() => URL.revokeObjectURL(a.href), 500)
}

const hideRedeemed = async () => {
  const checkbox = document.getElementById('hide-redeemed')
  console.log('Hiding redeemed keys.')
  if (!checkbox.checked) {
    checkbox.click()
    await delayOf(250)
  }
}

const setFirstPage = async () => {
  console.log('Setting first page.')
  document.querySelector('.js-jump-to-page[data-index="0"]').click()
  await delayOf(100)
}

const getKeysForCurrentPage = () => {
  // Exclude special rows like Humble Choice "Make My Choices" row/button
  return [...document.querySelectorAll('.unredeemed-keys-table tbody tr[class=""]')].map(row => {
    return {
      platform: row.querySelector('.platform :first-child').title.trim(),
      name: row.querySelector('.game-name h4').textContent.trim().replace(/®|™/g, ''),
      bundle: row.querySelector('.game-name p').textContent.trim(),
      bundle_url: row.querySelector('.game-name a').href
    }
  })
}

const hasNextPage = () => document.querySelector('.js-jump-to-page.current + .js-jump-to-page') !== null

const setNextPage = async () => {
  const page = document.querySelector('.js-jump-to-page.current + .js-jump-to-page')
  if (page !== null) {
    page.click()
    await delayOf(100)
  }
}

const getAllKeys = async () => {
  let data = getKeysForCurrentPage()
  if (hasNextPage()) {
    await setNextPage()
    return data.concat(await getAllKeys())
  } else {
    return data
  }
}

export function run() {
  if (window.location.pathname.includes('/home/keys')) {
    setFirstPage()
      .then(hideRedeemed)
      .then(getAllKeys)
      .then(data => JSON.stringify(data, null, 2))
      .then(json => downloadFile(json, 'humble-bundle-keys.json'))
  } else {
    console.log("No eligible page detected.")
  }
}
