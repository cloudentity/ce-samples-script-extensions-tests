const postidpauthn = require('./postidpauthn_jit_user_into_id_pool');

test('authentication context should stay the same', () => {

  var input = {
    "context": {
      "authn_ctx": {
        "sub": "user-1",
	"family_name": "Doe",
	"given_name": "John",
	"email": "john.doe@mailinator.com",
	"name": "John Doe"
      }
    }
  }

  var expected = {
    "authn_ctx": {
      "test": "User added"
    }
  };

  return postidpauthn(input.context).then(data => {
    expect(data).toStrictEqual(expected);
  });
})
