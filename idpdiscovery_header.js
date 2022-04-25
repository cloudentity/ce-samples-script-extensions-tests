module.exports = async function (context) {
    var idpIDs = [];
    for (var i = 0; i < context.idps.length; i++) {
        if (context.idps[i].name === "SomeIDP" && context.request.headers["Custom-Header"]) {
            idpIDs.push(context.idps[i].id);
        }
    }
    return {
        idps_ids: idpIDs
    };
}