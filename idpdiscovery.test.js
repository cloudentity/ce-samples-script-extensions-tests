const idpDiscovery = require('./idpdiscovery');

test('idp discovery', () => {

    var input = {
        "context": {
            "client": {
                "client_id": "default-demo"
            },
            "idps": [
                {
                    "name": "Default",
                    "id": "default"
                }
            ]
        }
    }

    var expected = { "idps_ids": ["default"] };

    return idpDiscovery(input.context).then(data => {
        expect(data).toStrictEqual(expected);
    });
})


