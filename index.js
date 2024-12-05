const https = require('https');

var SERVER_KEY = null;
var PACKAGE_INFO = {
  name: 'NodeJS-Core',
  version: '1.0'
}

function initPackageInfo(packageInfo) {
  PACKAGE_INFO.name = packageInfo.name;
  PACKAGE_INFO.version = packageInfo.version;
}

function getNetworkErrorResponse(message) {
  return {
    reqId: '00000000-0000-0000-0000-000000000000',
    result: {
      isAllowed: true,
    },
    error: {
      message: "[BotBye] " + message
    }
  }
}


function init(options) {
  SERVER_KEY = options.serverKey;

  return validateRequest;
}

var keepAliveAgent = new https.Agent({
  keepAlive: true,
});

var url = `verify.botbye.com`;
var path = '/validate-request/v2';

function validateRequest(options) {
  var token = options.token;
  var headers = options.headers;
  var requestInfo = options.requestInfo;
  var customFields = options.customFields;

  if (SERVER_KEY === null) {
    reject("[BotBye] Init script wasn't called");
  }

  customFields = customFields || {};

  requestInfo["created_at"] = Date.now() / 1000;


  var requestData = JSON.stringify({
    request_info: requestInfo,
    headers: headers,
    server_key: SERVER_KEY,
    token: token,
    custom_fields: customFields
  });

  return new Promise(function (resolve) {
    var headers = {};
    headers['Module-Name'] = PACKAGE_INFO.name;
    headers['Module-Version'] = PACKAGE_INFO.version;

    var options = {
      hostname: url,
      path: path + "?" + encodeURI(token),
      method: 'POST',
      headers: headers,
      agent: keepAliveAgent,
    };

    var timer = setTimeout(function () {
      resolve(getNetworkErrorResponse("Connection timeout"))
    }, 1000);

    var req = https.request(options, function (res) {
      var data = '';

      res.on('data', function (chunk) {
        if (timer !== null) {
          clearTimeout(timer)
          timer = null
        }
        data += chunk;
      });

      res.on('end', function () {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          var message = ""
          if (e instanceof Error) {
            message = e.message
          }
          resolve(getNetworkErrorResponse(message))
        }
      });
    });

    req.on('error', function (e) {
      if (timer !== null) {
        clearTimeout(timer)
        timer = null
      }
      resolve(getNetworkErrorResponse(e.message))
    });

    req.write(requestData);
    req.end();
  });
}

module.exports = {
  init: init,
  validateRequest: validateRequest,
  initPackageInfo: initPackageInfo,
}
