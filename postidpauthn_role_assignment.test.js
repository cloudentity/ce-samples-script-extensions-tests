const postidpauthn = require('./postidpauthn_role_assignment');

test('user specific role should be returned', () => {

  var input = {
    "context": {
      "authn_ctx": {
        "sub": "user-1"
      }
    }
  }

  var expectedResponseJson = {
    "authn_ctx": {
      "roles": [
        "USER_ACCESS_X"
      ]
    }
  };

  return postidpauthn(input.context).then(data => {
    expect(data).toStrictEqual(expectedResponseJson);
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

  var expectedResponseJson = {
    "authn_ctx": {
      "roles": [
        "DEFAULT_ROLE"
      ]
    }
  };

  return postidpauthn(input.context).then(data => {
    expect(data).toStrictEqual(expectedResponseJson);
  });
})

