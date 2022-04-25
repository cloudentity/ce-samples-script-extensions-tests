const idpDiscoveryQueryParam = require('./idpdiscovery_query_param');

test('idp discovery filters by query param present', () => {

    let input = {
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
                "query_params": {
                    "login_hint":"myuser"
                }
            }
        }
    }

    var expected = { "idps_ids": ["some-idp"] };

    return idpDiscoveryQueryParam(input.context).then(data => {
        expect(data).toStrictEqual(expected);
    });
})


test('idp discovery filters by query param not present', () => {

    let input = {
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
                }
            }
        }
    }

    var expected = { "idps_ids": [] };

    return idpDiscoveryQueryParam(input.context).then(data => {
        expect(data).toStrictEqual(expected);
    });
})
