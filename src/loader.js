console.log("Loading HumbleBundleKeyScraper...")

// TODO: wrap in conditional, only run if HumbleBundleKeyScraper is undefined

const url = "//rawgit.com/javierjulio/humble-bundle-scraper/master/dist/humble-bundle-key-scraper.js"

const script = document.createElement("script")
script.id = "__humbleBundleScraper"
script.src = url + "?c=" + Math.floor((Math.random() * 10000) + 1)
script.onload = function(){
  console.log("HumbleBundleKeyScraper loaded.", "Scraping...")
  HumbleBundleKeyScraper.run()
}

document.head.appendChild(script)
