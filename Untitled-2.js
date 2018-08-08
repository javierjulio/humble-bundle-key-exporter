const delayOf = ms => new Promise(resolve => setTimeout(resolve, ms))

const downloadFile = (data, name) => {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([data]))
  a.download = name
  a.click()
  setTimeout(() => URL.revokeObjectURL(a.href), 500)
}

const setFirstPage = async () => {
  console.log('Setting first page.')
  document.querySelector('.paginator-control__beginning').click()
  await delayOf(200)
}

const formatSize = (size) => {
  if (size.includes("MB"))
    return `${Math.round(parseFloat(size))}MB`
  else if (size.includes("KB"))
    return `${Math.round(parseFloat(size))}KB`
  else if (size.includes("GB"))
    return `${parseFloat(size).toFixed(1)}GB`
  else
    return size
}

const getMetadata = (item) => item.querySelector('.download-list-item__metadata').textContent.trim().split(/\s*\|\s*/)

const getPlatforms = (item) => [...item.querySelectorAll('.download-list-item__playable-platforms')].map(el => el.textContent)

const getEligibleItems = () => {
  return [...document.querySelectorAll('.download-list .download-list-item')].filter(item => {
    const metadata = getMetadata(item)
    const platforms = getPlatforms(item)
    return metadata[0] === "Game" && (platforms.includes("PS4") || platforms.includes("PS Vita"))
  })
}

const getKeysForCurrentPage = () => {
  return getEligibleItems().map(item => {
    const metadata = getMetadata(item)
    return {
      name: item.querySelector('.download-list-item__title').textContent.trim().replace(/®|™/g, ''),
      // type: metadata[0], // Game, Add-On, Theme
      size: formatSize(metadata[1]),
      date: metadata[2],
      platforms: getPlatforms(item),
      page: document.querySelector('.paginator-control__page-number--selected').textContent
    }
  })
}

const hasNextPage = () => document.querySelector('.paginator-control__next:not(.paginator-control__arrow-navigation--disabled)') !== null

const setNextPage = async () => {
  const page = document.querySelector('.paginator-control__next:not(.paginator-control__arrow-navigation--disabled)')
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

// export function run() {
//   if (window.location.pathname.includes('download/list')) {
    setFirstPage()
      .then(getAllKeys)
      .then(data => JSON.stringify(data, null, 2))
      .then(json => downloadFile(json, 'ps-downloads.json'))
//   } else {
//     console.log("No eligible page detected.")
//   }
// }
