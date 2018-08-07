import { delayOf, downloadFile } from './helpers/helpers.js'

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
  return [...document.querySelectorAll('.unredeemed-keys-table tbody tr')].map(row => {
    return {
      platform: row.querySelector('.platform :first-child').title,
      name: row.querySelector('.game-name h4').textContent,
      bundle: row.querySelector('.game-name p').textContent,
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
  // TODO: only execute if current page is /home/keys
  setFirstPage()
    .then(hideRedeemed)
    .then(getAllKeys)
    .then((data) => JSON.stringify(data, null, 2))
    .then((json) => downloadFile(json, 'humble-bundle-keys.json'))
}
