module.exports = async function(context) {
      const request = require('request-promise-native');

        const response = await request({
          method: 'GET',
          json: true,
          uri: 'https://raw.githubusercontent.com/cloudentity/random-bin/master/json/user-roles-simple.json'
        });
        var userRecord = response.filter(item => item.userId == context.id_token.sub)
  	if (userRecord.length !=0) {
	    return {
        	access_token: {
            	   myRoles: userRecord[0].roles
	        }
            };
	 } else {
            return {
                access_token: {
		   myRoles: [
			"DEFAULT"
		   ]
            }
        };
      } 
  }
