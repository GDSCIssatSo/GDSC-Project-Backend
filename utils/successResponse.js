const _ = require('lodash');

function successResponse(user){
    const response = new Object();
    response.status="Success";
    response.data = _.omit(JSON.parse(JSON.stringify(user)), ["password"]);
    return response;
  }


  module.exports = successResponse;