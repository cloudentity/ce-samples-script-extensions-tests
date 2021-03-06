const idpDiscovery = require('./idpdiscovery');

test('idp discovery filters by client id and idp name', () => {

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
                    "login_hint":"myuser"
                }
            }
        }
    }

    var expected = { "idps_ids": ["default"] };

    return idpDiscovery(input.context).then(data => {
        expect(data).toStrictEqual(expected);
    });
})

test('idp discovery returns empty array for idp name not present', () => {

    let input = {
        "context": {
            "client": {
                "client_id": "default-demo"
            },
            "idps": [
                {
                    "name": "SomeIDP",
                    "id": "some-idp"
                }
            ],
        }
    }

    var expected = { "idps_ids": [] };

    return idpDiscovery(input.context).then(data => {
        expect(data).toStrictEqual(expected);
    });
})




