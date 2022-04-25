## Overview

This repo provides a javascript testing base bed for Cloudentity extension scripts.
This can be forked and tests can be added to test more scenarios
and also source control tests for the Cloudentity extension points.

### Jest

This project utilizes `Jest` as the underlying tool to facilitate testing and is well documented at https://jestjs.io/docs/getting-started

### Usage

> NOTE: Please use ONLY the packages available in Cloudentity script 
> extensions editor. In case you do not see a package that is required 
> for your usecase, please raise a product support request via the 
> Cloudentity product support portal. 

#### Add the extension script

* Add a new script with a meaninful name (for example `postidpauthn.js`) that has an `async` function. Note that this script needs to match the one that be utilized in Cloudentity product.

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
#### Add tests for extension script

* Create a test file

    For above script, create a test script file name `<scriptfilename>.test.js` (eg: `postidpauthn.test.js`)

* Add all test scenarios 

    All all the test scenarios for that specific script within the test file. Provide the input and expected outputs to assert against the actual output.

```js
const postidpauthn = require('./postidpauthn');

test('user specific role should be returned', () => {

  var input = {
    "context": {
      "authn_ctx": {
        "sub": "user-1"
      }
    }
  }

  var expected = {
    "authn_ctx": {
      "roles": [
        "USER_ACCESS_X"
      ]
    }
  };

  return postidpauthn(input.context).then(data => {
    expect(data).toStrictEqual(expected);
  });
})

test('default role should be returned', () => {

  var input = {
    "context": {
      "authn_ctx": {
        "sub": "user-x"
      }
    }
  }

  var expected = {
    "authn_ctx": {
      "roles": [
        "DEFAULT_ROLE"
      ]
    }
  };

  return postidpauthn(input.context).then(data => {
    expect(data).toStrictEqual(expected);
  });
})


```

### How to run

`npm test`

### Happy testing

Now you can use this testbed to test your scripts and also source control all the tests for the Cloudentity extensions. Happy coding and testing!