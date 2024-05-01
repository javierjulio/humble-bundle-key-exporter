function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function getData() {
  return $.map($('.unredeemed-keys-table tbody tr'), function(el){
    var row = $(el);
    return {
      platform: row.find('.platform :eq(0)').attr('title'),
      name: row.find('.game-name h4').text(),
      bundle: row.find('.game-name p').text(),
      bundle_url: row.find('.game-name a').prop('href'),
    }
  })
};
var result = getData();
var nextPage = $('.js-jump-to-page.current + .js-jump-to-page');
getNextPage()
function getNextPage() {
  if (nextPage.size() == 0)
    return;

  console.log("Page " + nextPage.first().text() + "...")
  nextPage.click()

  sleep(1000).then(() => {
    result = result.concat(getData())
    console.log(nextPage.first().text() + " done.")
    nextPage = $('.js-jump-to-page.current + .js-jump-to-page');
    getNextPage()
  });
}
result





const rec = (i) => {
  console.log(i, (new Date()));
  // if next page then load it

  // else cancel
  if (i > 5) {
    console.log('canceling')
    return;
  }

  // parse content
  setTimeout(() => rec(i + 1), 1000);
}








// https://github.com/imjohansunden/simple-async-queue
class SimpleAsyncQueue {
  constructor(options) {
    this.run = this.run.bind(this)
    this.callback = options.callback.bind(this)
    this.done = options.done
    this.queue = []
    this.data = []
  }

  run() {
    if (this.queue.length) {
      if (typeof this.callback === 'function') {
        let result = this.callback(this.queue.shift(), this.run)
        if (result) {
          this.data = this.data.concat(result)
        }
      }
    } else {
      if (typeof this.done === 'function') {
        this.done()
      }

      this.queue = []
    }
  }

  add(item) {
    this.queue = Array.isArray(item) ? [...this.queue, ...item] : [...this.queue, item]
  }
}

Array.prototype.compact = function() { return this.filter(function(e) { return e; }); };

const hideRedeemed = () => {
  console.log('Hiding redeemed keys.')
  document.getElementById('hide-redeemed').checked = true
}

const loadFirstPage = () => {
  console.log('Loading first page.')
  document.querySelector('.js-jump-to-page[data-index="0"]').click()
}

hideRedeemed()
loadFirstPage()

const queue = new SimpleAsyncQueue({
  callback: (item, next) => {
    let result = item()
    window.setTimeout(next, 150)
    return result
  },
  done: () => queuePageLoader,
})
queue.add(hideRedeemed)
queue.add(loadFirstPage)
queue.run()

function queuePageLoader() {
  pages = [...document.querySelectorAll('.js-jump-to-page')].map((el) => el.dataset.index)
  first = Math.min(...pages)
  last = Math.max(...pages)

  for (let i = 0; i <= last; i++) {
    queue.add(getData)
    queue.add(loadNextPage)
  }

  queue.run()
}

pages = [...document.querySelectorAll('.js-jump-to-page')].map((el) => el.dataset.index)
first = Math.min(...pages)
last = Math.max(...pages)

function getData() {
  let result = $.map([...document.querySelectorAll('.unredeemed-keys-table tbody tr')], function(row){
    return {
      platform: row.querySelector('.platform :first-child').title,
      name: row.querySelector('.game-name h4').textContent,
      bundle: row.querySelector('.game-name p').textContent,
      bundle_url: row.querySelector('.game-name a').href,
    }
  })
  return result
};

function loadNextPage() {
  let link = document.querySelector('.js-jump-to-page.current + .js-jump-to-page')
  if (link !== null) {
    link.click()
  }
}

for (let i = 0; i <= last; i++) {
  queue.add(getData)
  queue.add(loadNextPage)
}

queue.run()

// Run after
result = queue.data.compact()//.filter(({platform}) => platform == "Steam")
copy(result)

















const hideRedeemed = () => {
  console.log('Hiding redeemed keys.')
  document.getElementById('hide-redeemed').checked = true
}

const setFirstPage = () => {
  console.log('Setting first page.')
  document.querySelector('.js-jump-to-page[data-index="0"]').click()
}

hideRedeemed()
setFirstPage()

const getUndeemedKeyRows = () => [...document.querySelectorAll('.unredeemed-keys-table tbody tr')]

const setNextPage = () => {
  const page = document.querySelector('.js-jump-to-page.current + .js-jump-to-page')
  if (page !== null) {
    page.click()
  }
  return page
}

const delayOf = ms => new Promise((resolve) => setTimeout(resolve, ms));

const getPageFragment = async function() {
  const result = getUndeemedKeyRows().map(row => {
    return {
      platform: row.querySelector('.platform :first-child').title,
      name: row.querySelector('.game-name h4').textContent,
      bundle: row.querySelector('.game-name p').textContent,
      bundle_url: row.querySelector('.game-name a').href,
    }
  })

  let page = setNextPage()

  await delayOf(150);

  return {
    data: result,
    hasNextPage: (page !== null)
  };
};
const getAllKeys = async function() {
  const fragment = await getPageFragment()
  if (fragment.hasNextPage) {
    return fragment.data.concat(await getAllKeys())
  } else {
    return fragment.data
  }
}
getAllKeys()
  .then((result) => {
    json = JSON.stringify(result, null, 2)

    const a = document.createElement('a')
    a.href = URL.createObjectURL( new Blob([json], { type: "text/json" }) )
    a.download = 'humble-bundle-keys.json'
    console.log(a)
    a.click()
  })
