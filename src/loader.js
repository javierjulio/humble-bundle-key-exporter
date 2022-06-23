if (window.HumbleBundleKeyExporter === undefined) {
  console.log("Loading HumbleBundleKeyExporter...")

  const url = "https://cdn.jsdelivr.net/gh/javierjulio/humble-bundle-key-exporter/dist/humble-bundle-key-exporter.js"

  const script = document.createElement("script")
  script.id = "__humbleBundleKeyExporter"
  script.src = url + "?c=" + Math.floor((Math.random() * 10000) + 1)
  script.onload = function(){
    console.log("HumbleBundleKeyExporter loaded.")
    console.log("Scraping content...")
    HumbleBundleKeyExporter.run()
  }

  document.head.appendChild(script)
} else {
  console.log("Scraping again...")
  HumbleBundleKeyExporter.run()
}
