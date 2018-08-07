if (window.HumbleBundleKeyScraper === undefined) {
  console.log("Loading HumbleBundleKeyScraper...")

  const url = "//rawgit.com/javierjulio/humble-bundle-key-scraper/master/dist/humble-bundle-key-scraper.js"

  const script = document.createElement("script")
  script.id = "__humbleBundleKeyScraper"
  script.src = url + "?c=" + Math.floor((Math.random() * 10000) + 1)
  script.onload = function(){
    console.log("HumbleBundleKeyScraper loaded.")
    console.log("Scraping...")
    HumbleBundleKeyScraper.run()
  }

  document.head.appendChild(script)
} else {
  console.log("Scraping again...")
  HumbleBundleKeyScraper.run()
}
