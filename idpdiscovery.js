module.exports = async function (context) {
    var idpIDs = [];
    for (var i = 0; i < context.idps.length; i++) {
        if (context.client.client_id === "default-demo" && context.idps[i].name === "Default") {

            idpIDs.push(context.idps[i].id);
        }
    }
    return {
        idps_ids: idpIDs
    };
}