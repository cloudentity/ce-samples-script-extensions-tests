const tokenpremintroleassignment = require('./token_premint_role_assignment');

test('user specific role should be returned', () => {

  var input = {
    "context": {
      "id_token": {
        "sub": "user-1"
      }
    }
  }

  var expected = {
    "access_token": {
      "myRoles": [
        "USER_ACCESS_X"
      ]
    }
  };

  return tokenpremintroleassignment(input.context).then(data => {
    expect(data).toStrictEqual(expected);
  });
})

test('default role should be returned', () => {

  var input = {
    "context": {
      "id_token": {
        "sub": "user-x"
      }
    }
  }

  var expected = {
    "access_token": {
      "myRoles": [
        "DEFAULT"
      ]
    }
  };

  return tokenpremintroleassignment(input.context).then(data => {
    expect(data).toStrictEqual(expected);
  });
})
