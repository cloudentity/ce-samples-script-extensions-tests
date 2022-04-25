module.exports = async function (context) {
    var idpIDs = [];
    for (var i = 0; i < context.idps.length; i++) {
        if (context.idps[i].name === "SomeIDP" && context.request.query_params['login_hint'].includes('myuser')) {
            idpIDs.push(context.idps[i].id);
        }
    }
    return {
        idps_ids: idpIDs
    };
}