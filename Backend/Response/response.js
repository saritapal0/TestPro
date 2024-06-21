class ResponseManager {
    static sendSuccess(res, data=[], statusCode = 200, message = "Success",errorCode="NO",errorMessage="")
     {
      const response = {
        statusCode,
        message,
        data,
        errorCode,
        errorMessage
      };
      res.status(statusCode).json(response);
    }
    static sendError(res, statusCode = 200, errorCode="Yes",errorMessage="") {
        var data=[]
        const response = {
          statusCode,
          data,
          errorCode,
          errorMessage
        };
        res.status(statusCode).json(response);
      }
   
  }
  module.exports = ResponseManager;
  