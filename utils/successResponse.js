const _ = require('lodash');

function successResponse(data){
    const response = new Object();
    response.status="Success";
    response.data = data;
    return response;
  }


  module.exports = successResponse;