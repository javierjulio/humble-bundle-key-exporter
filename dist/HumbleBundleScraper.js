(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('HumbleBundleScraper', ['module'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod);
    global.HumbleBundleScraper = mod.exports;
  }
})(this, function (module) {
  'use strict';

  function delayOf(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function downloadFile(data, name) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([data]));
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 500);
  }

  const hideRedeemed = async () => {
    const checkbox = document.getElementById('hide-redeemed');
    console.log('Hiding redeemed keys.');
    if (!checkbox.checked) {
      checkbox.click();
      await delayOf(250);
    }
  };

  const setFirstPage = async () => {
    console.log('Setting first page.');
    document.querySelector('.js-jump-to-page[data-index="0"]').click();
    await delayOf(100);
  };

  const getKeysForCurrentPage = () => {
    return [...document.querySelectorAll('.unredeemed-keys-table tbody tr')].map(row => {
      return {
        platform: row.querySelector('.platform :first-child').title,
        name: row.querySelector('.game-name h4').textContent,
        bundle: row.querySelector('.game-name p').textContent,
        bundle_url: row.querySelector('.game-name a').href
      };
    });
  };

  const hasNextPage = () => document.querySelector('.js-jump-to-page.current + .js-jump-to-page') !== null;

  const setNextPage = async () => {
    const page = document.querySelector('.js-jump-to-page.current + .js-jump-to-page');
    if (page !== null) {
      page.click();
      await delayOf(100);
    }
  };

  const getAllKeys = async () => {
    let data = getKeysForCurrentPage();
    if (hasNextPage()) {
      await setNextPage();
      return data.concat((await getAllKeys()));
    } else {
      return data;
    }
  };

  var index = class {
    constructor() {}
    run() {
      setFirstPage().then(hideRedeemed).then(getAllKeys).then(data => JSON.stringify(data, null, 2)).then(json => downloadFile(json, 'humble-bundle-keys.json'));
    }
  };

  module.exports = index;
});