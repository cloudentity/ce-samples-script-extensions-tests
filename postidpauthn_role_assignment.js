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

function authnCtx(u) {

  if (u.length != 0) {
    return {
      authn_ctx: {
        roles: u[0].roles
      }
    };
  } else {
    return {
      authn_ctx: {
        roles: ["DEFAULT_ROLE"]
      }
    };
  }
}
