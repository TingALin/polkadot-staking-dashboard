// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

const { join } = require('path');
const fs = require('fs');
const { localeDir, languages, orderKeys } = require('./utils.js');

// the suffixes of keys related to i18n functionality that should be ignored.
const ignoreSubstrings = ['_one', '_two', '_few', '_many', '_other'];

// check whether a key ends with an `ignoreSubstring`.
const endsWithIgnoreSubstring = (key) =>
  ignoreSubstrings.some((i) => key.endsWith(i));

// recursive function to get all keys of a locale object.
const getDeepKeys = (obj) => {
  let keys = [];
  for (const key in obj) {
    let isSubstring = false;

    // not number.
    if (isNaN(key)) {
      // check if key includes any special substrings.
      if (endsWithIgnoreSubstring(key)) {
        isSubstring = true;
        // get the substring up to the last underscore.
        const rawKey = key.substring(0, key.lastIndexOf('_'));
        // add the key to `keys` if it does not already exist.
        if (!keys.includes(rawKey)) {
          keys.push(rawKey);
        }
      }
    }

    // full string, if not already added, go ahead and add.
    if (!isSubstring) {
      if (!keys.includes(key)) {
        keys.push(key);
      }
    }

    // if object, recursively get keys.
    if (typeof obj[key] === 'object') {
      const subkeys = getDeepKeys(obj[key]);
      keys = keys.concat(subkeys.map((subkey) => `${key}.${subkey}`));
    }
  }
  return keys;
};

const defaultPath = join(localeDir, 'en');

// locale directories, ommitting `en` - the langauge to check missing keys against.
const languagesButEn = languages.filter((v) => v !== 'en');

// const para = (lng, index) => {
//   const p = lng[index].slice((lng[index].indexOf('.') + 1));
//   return p;
// };
// const paraMinus = (lng, index) => {
//   const p = lng[index - 1].slice((lng[index].indexOf('.') + 1));
//   return p;
// };

fs.readdir(defaultPath, (error, files) => {
  if (error) console.log(error);

  files.forEach((file) => {
    const defaultJson = JSON.parse(
      fs.readFileSync(join(defaultPath, file)).toString()
    );

    languagesButEn.forEach((lng) => {
      const otherPath = join(localeDir, lng);
      const otherJson = JSON.parse(
        fs.readFileSync(join(otherPath, file)).toString()
      );

      const en = getDeepKeys(defaultJson);
      const others = getDeepKeys(otherJson);
      // for (i in Object.values(en)) {
      //   if (en[i].indexOf('.') > 0) {
      //     const iLetter = para(en, i);
      //     const iMinusLetter = paraMinus(en, i);
      //     if (iLetter < iMinusLetter) {
      //       console.log(`En/"${file}" JSON is NOT alphabaticlly ordered`)
      //     }
      //   }
      // }
      // for (i in Object.values(others)) {
      //   if (others[i].indexOf('.') > 0) {
      //     const iLetter = para(others, i);
      //     const iMinusLetter = paraMinus(others, i);
      //     if (iLetter < iMinusLetter) {
      //       console.log(`"${lng}"/"${file}" is NOT alphabaticlly ordered`)
      //     }
      //   }
      // }

      if (en.sort().length !== others.sort().length) {
        if (en === orderKeys(en) && others === orderKeys(others)) {
          console.log("Keys Are Ordered Alphabetically")
        } else {
          console.log("Keys Are Not Ordered Alphabetically")
        }
        const missing = en.filter((item) => others.indexOf(item) < 0);
        if (missing.join('').trim().length > 0) {
          throw new Error(
            `Missing the following keys from locale "${lng}", file: "${file}":\n"${missing}".`
          );
        }
      }
    });
  });
});