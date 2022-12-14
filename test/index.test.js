import { afterEach, describe, expect, it, vi } from "vitest"
import { delayOf, downloadFile, getKeysForCurrentPage, hasNextPage } from "../src/index"

describe("delayOf", async () => {
  it("resolves successfully", async () => {
    await expect(delayOf(10)).resolves.toBeUndefined()
  })
})

describe("downloadFile", async () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("completes", () => {
    const mock = vi.fn((a) => "")
    vi.stubGlobal('URL', { createObjectURL: mock })

    const data = [ { a: 1 } ]
    const json = JSON.stringify(data, null, 2)
    downloadFile(json, "sample.json")

    expect(mock).toHaveBeenCalledTimes(1)
  })
})

describe("hasNextPage", () => {
  it("returns true when current page has adjacent sibling", () => {
    document.body.innerHTML = `
      <div class="js-jump-to-page jump-to-page current" data-index="0">1</div>
      <div class="js-jump-to-page jump-to-page" data-index="1">2</div>
    `
    expect(hasNextPage()).toEqual(true)
  })

  it("returns false when current page has no adjacent siblings", () => {
    document.body.innerHTML = `
      <div class="js-jump-to-page jump-to-page current" data-index="0">1</div>
    `
    expect(hasNextPage()).toEqual(false)
  })
})

describe("getKeysForCurrentPage", () => {
  it("returns parsed keys from page", () => {
    document.body.innerHTML = `
      <table class="unredeemed-keys-table">
        <tbody>
          <tr class="">
            <td class="platform"><i class="hb hb-key hb-steam" title="Steam"></i></td>
            <td class="game-name">
              <h4 title="Gears Tactics">Gears Tactics</h4>
              <p title="The Tactician's Bundle"><a href="/download?key=test" target="_blank">The Tactician's Bundle</a></p>
            </td>
          </tr>
        </tbody>
      </table>
    `

    expect(getKeysForCurrentPage()).toEqual([
      {
        platform: "Steam",
        name: "Gears Tactics",
        bundle: "The Tactician's Bundle",
        bundle_url: "http://localhost:3000/download?key=test"
      }
    ])
  })

  it("does not include rows with classes set", () => {
    document.body.innerHTML = `
      <table class="unredeemed-keys-table">
        <tbody>
          <tr class="key-manager-choice-row">
            <td class="platform"></td>
            <td class="game-name"><h4>August 2021 Humble Choice</h4></td>
          </tr>
        </tbody>
      </table>
    `

    expect(getKeysForCurrentPage()).toEqual([])
  })
})
