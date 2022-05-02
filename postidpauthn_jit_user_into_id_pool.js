module.exports = async function(context) {
      const request = require('request-promise-native');

          var at = "also nothing";
          
          var response = await request({
            method: 'POST',
            uri: '{tenant url}/{tenant id}/admin/oauth2/token',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': '*/*'
            },
            body: 'grant_type=client_credentials&client_id={client id}&client_secret={client secret}'
          });

        at = JSON.parse(response).access_token;


        response = await request({
          method: 'POST',
          uri: '{tenant url}/identity/{tenant id}/admin/pools/{pool id}/users',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer' + at
          },
          json: true,
          body: {
            "id": context.authn_ctx.sub,
            "identifiers": [
              {
                "identifier": context.authn_ctx.email,
                "type": "email"
              }
            ],
            "payload": {
              "family_name": context.authn_ctx.family_name,
              "given_name": context.authn_ctx.given_name,
              "name": context.authn_ctx.name
            },
            "payload_schema_id": "default_payload",
            "metadata": {},
            "metadata_schema_id": "default_metadata",
            "status": "new",
            "verifiable_addresses": [
              {
                "address": context.authn_ctx.email,
                "preferred_contact_method": "sms",
                "status": "active",
                "type": "email",
                "verified": false
              }
            ]
          }
        });
        
	return {
          authn_ctx: {
            test: "User added"
          }
        }
      
}
