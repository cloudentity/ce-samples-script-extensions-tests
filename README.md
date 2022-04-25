## Overview

This repo provides a javascript testing base bed for Cloudentity extension scripts.
This can be forked and tests can be added to test more scenarios
and also source control tests for the Cloudentity extension points.

### Jest

This project utilizes `Jest` as the underlying tool to facilitate testing and is well documented at https://jestjs.io/docs/getting-started

### How to create a new test?


> NOTE: Please use ONLY the script and packages available
> in Cloudentity script extensions editor. In case you do not
> see a package that does not fulfill the usecase, please
> raise a product support request via the Cloudentity product
> support portal. 

* Add a new script with a meaninful name (for example `postidpauthn.js`) that has an `async` function

```js
var request = require('request-promise-native');

module.exports = async function postidpauthn(context) {

  const response = await request({
    method: 'GET',
    json: true,
    uri: 'https://raw.githubusercontent.com/cloudentity/random-bin/master/json/user-roles-simple.json'
  });

  // console.log('response from async', response);

  var userRecord = response.filter(u => u.userId == context.authn_ctx.sub)
  var authn_ctx = authnCtx(userRecord)

  return authn_ctx;

}
```

* Create a test file

For above script, create a test script file name `<scriptfilename>.test.js` (eg: `postidpauthn.test.js`)

* Add all test scenarios for that specific script within the test file

```js
const postidpauthn = require('./postidpauthn');

test('idp test when xyz attribute is available', () => {
    var expectedResponseJson = { "authn_ctx": { "commit": "748b628" } } ;

    return postidpauthn().then(data => {
        expect(data).toStrictEqual(expectedResponseJson);
      });
})
```

### How to run

`npm test`