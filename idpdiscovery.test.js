const idpDiscovery = require('./idpdiscovery');
const idpDiscoveryHeader = require('./idpdiscovery_header');
const idpDiscoveryQueryParam = require('./idpdiscovery_query_param');
const idpDiscoveryNoMatch = require('./idpdiscovery_no_match');

test('idp discovery filters by client id and idp name', () => {

    let input = getInput()

    var expected = { "idps_ids": ["default"] };

    return idpDiscovery(input.context).then(data => {
        expect(data).toStrictEqual(expected);
    });
})

test('idp discovery filters by header', () => {

    let input = getInput()

    var expected = { "idps_ids": ["some-idp"] };

    return idpDiscoveryHeader(input.context).then(data => {
        expect(data).toStrictEqual(expected);
    });
})

test('idp discovery filters by query param', () => {

    let input = getInput()

    var expected = { "idps_ids": ["some-idp"] };

    return idpDiscoveryQueryParam(input.context).then(data => {
        expect(data).toStrictEqual(expected);
    });
})

/* 
   If the script returns no matches an empty array is returned to ACP.
   If ACP gets an empty array back from the script
   then it will return all IDPs for login.
*/
test('idp discovery returns empty array on no match', () => {

    let input = getInput()

    var expected = { "idps_ids": [] };

    return idpDiscoveryNoMatch(input.context).then(data => {
        expect(data).toStrictEqual(expected);
    });
})

function getInput() {
    return {
        "context": {
            "client": {
                "client_id": "default-demo"
            },
            "idps": [
                {
                    "name": "Default",
                    "id": "default"
                },
                {
                    "name": "SomeIDP",
                    "id": "some-idp"
                }
            ],
            request: {
                "headers": {
                    "Custom-Header": [
                        "value1"
                      ],
                },
                "query_params": {
                    "login_hint":"myuser"
                }
            }
        }
    }
}


