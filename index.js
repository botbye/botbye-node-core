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

function makeRequest(options, requestData, apiOptions) {
  apiOptions = apiOptions || {};
  return new Promise(function (resolve, reject) {
    const request = https.request(options, function (response) {
      var data = '';
      if (apiOptions.encoding) {
        response.setEncoding(apiOptions.encoding);
      }

      response.on("data", function (chunk) {
        apiOptions.onData && apiOptions.onData(chunk);
        data += chunk;
      });

      response.on('end', function () {
        resolve(data);
      });
    });

    request.on('error', function (e) {
      reject(e);
    });

    request.on("close", function (e) {
      reject(e);
    })


    requestData && request.write(requestData);
    request.end();

    apiOptions.addAbortCb && apiOptions.addAbortCb(function () {
      if (!request.aborted && !request.closed) {
        request.abort();
      }
    });
  });
}

function sendInitRequest(serverKey) {
  var callOptions = {
    hostname: url,
    path: "/init-request/v1",
    method: 'POST',
  }

  var postData = JSON.stringify({
    serverKey: serverKey
  });

  makeRequest(callOptions, postData).then(function (data) {
    try {
      var parsed = JSON.parse(data);

      if (parsed.error) {
        throw new Error(parsed.error)
      }

      if (parsed.status === "ok") {
        console.log("[BotBye] Inited")
      }
    } catch (e) {
      console.log("[BotBye] Init Error: ", e)
    }
  })
}

function init(options) {
  SERVER_KEY = options.serverKey;

  sendInitRequest(SERVER_KEY);

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

    var abortCbs = [];

    var timer = setTimeout(function () {
      resolve(getNetworkErrorResponse("Connection timeout"));
      abortCbs.forEach(function (cb) {
        cb();
      })
    }, 1000);

    makeRequest(options, requestData, {
      onData: function () {
        clearTimeout(timer);
      },
      addAbortCb: function (cb) {
        abortCbs.push(cb)
      },
    }).then(function (data) {
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        var message = ""
        if (e instanceof Error) {
          message = e.message
        }
        resolve(getNetworkErrorResponse(message))
      }
    }).catch(function (e) {
      resolve(getNetworkErrorResponse((e && e.message) || "Unexpected error"))
    });
  });
}

module.exports = {
  init: init,
  validateRequest: validateRequest,
  initPackageInfo: initPackageInfo,
}
