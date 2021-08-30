
function failureResponse(errors){
    const response = new Object();
    response.status="Failure";
    if (errors.errors){
        response.errors= errors.errors
    }
    else
        response.errors = [errors];
    return response;
 }

module.exports = failureResponse;