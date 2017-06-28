module.exports = ({
  success: {
    ok: 200,
    created: 201,
    accepted: 202,
    noContent: 204
  },
  warning: {
    badRequest: [400, "The server cannot process the request"],
    notFound: [404, "The requested resource could not be found"],
    methodNotAllow: [405, "The request method is not supported for the requested resource"],
    header: [417, "The server cannot meet the requirements of the Expect request-header field."]
  },
  user: {
    userExist: [409, "this username is already taken"],
    userEmpty: [404, "User DB is empty"],
    userNotFound: [404, "User not found in the db"],
    Unauthorized: [401, "The request requires admin permission."]
  },
  client: {
    clientExist: [409, "this client name is already taken"],
    clientEmpty: [404, "client DB is empty"],
    clientNotFound: [404, "client not found in the db"],
    Unauthorized: [401, "The request requires admin permission."]
  },
  token: {
    invalidToken: [498, "expired or invalid token."],
    tokenRequired: [499, "token is required but was not submitted."],
    authentication: [511, "Network Authentication Required"]
  },
  database: {
    create: [500, "Database cound't add this object to the db"],
    update: [500, "Database cound't update this object on the db"],
    delete: [500, "Database cound't delete this object on the db"]
  },
  quickbooks: {
    update: [400, "Something happened please check logs"]
  }
  
})
