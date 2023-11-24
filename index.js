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
    result: null,
    error: {
      message: message
    }
  }
}


function init(serverKey) {
  SERVER_KEY = serverKey;

  return validateRequest;
}

var keepAliveAgent = new https.Agent({
  keepAlive: true,
});

var url = `api.botbye.com`;
var path = '/validate-request/v1';

function validateRequest(token, headers, requestInfo, customFields) {
  if (SERVER_KEY === null) {
    reject("[BotBye] Init script wasn't called");
  }

  requestInfo = requestInfo || {};
  headers = headers || {};
  customFields = customFields || [];

  Object.assign(requestInfo, {
    created_at: Date.now() / 1000,
  });

  var requestData = JSON.stringify({
    request_info: requestInfo,
    headers: headers,
    server_key: SERVER_KEY,
    token: token,
    custom_fields: customFields
  });

  return new Promise((resolve) => {
    var options = {
      hostname: url,
      path: path,
      method: 'POST',
      headers: {
        ['Module-Name']: PACKAGE_INFO.name,
        ['Module-Version']: PACKAGE_INFO.version,
      },
      agent: keepAliveAgent,
    };

    var req = https.request(options, (res) => {
      var data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(getNetworkErrorResponse('[BotBye] Request fail'))
        }
      });
    });

    req.on('error', (e) => {
      resolve(getNetworkErrorResponse(e.message))
    });

    req.write(requestData);
    req.end();
  });
}

module.exports = {
  init,
  validateRequest,
  initPackageInfo,
}
