const idpDiscoveryHeader = require('./idpdiscovery_header');

test('idp discovery filters by header present', () => {

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

    var expected = { "idps_ids": ["some-idp"] };

    return idpDiscoveryHeader(input.context).then(data => {
        expect(data).toStrictEqual(expected);
    });
})

test('idp discovery returns empty array header not present', () => {

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
                "headers": {},
                "query_params": {
                    "login_hint":"myuser"
                }
            }
        }
    }

    var expected = { "idps_ids": [] };

    return idpDiscoveryHeader(input.context).then(data => {
        expect(data).toStrictEqual(expected);
    });
})

test('idp discovery returns empty array header present wrong value', () => {

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
                        "not-valid"
                      ],
                },
                "query_params": {
                    "login_hint":"myuser"
                }
            }
        }
    }

    var expected = { "idps_ids": [] };

    return idpDiscoveryHeader(input.context).then(data => {
        expect(data).toStrictEqual(expected);
    });
})


