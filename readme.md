# Core

#### In case when you use custom library

## Install

```bash
npm i botbye-node-core
```

or

```bash
yarn add botbye-node-core
```

### Usage

#### 1. Import `botbye` module:

```javascript
const botbye = require('botbye-node-core')
```

#### 2. Call `init` with SERVER_KEY:

```javascript
const validateRequest = botbye.init({
    serverKey: 'MY_SERVER_KEY'
});
```

#### 3. Use `validateRequest` on handlers where you need bot protection

#### In validateRequest pass token, headers array, and requestInfo

```javascript

/**
 * All request headers
 **/
const headers = {
    'host': 'example.com',
    'some-header': 'value1, value2'
};

/**
 *  Information about the request
 **/
const requestInfo = {
    'request_uri': "/path",
    'request_method': "GET",
    'remote_addr': request.connection.remoteAddress, // User IP
}

/**
 * Additional custom fields for linking request
 **/
const customFields = [
    'custom field 1 value',
    'custom field 2 value',
    'custom field 3 value',
]

const options = {
    token, // BotBye token from client-side
    headers,
    requestInfo,
    customFields
}

/**
 * @param {Object} options - Options for request validation
 * @return {Promise} - botByeResponse promise
 */
const botByeResponse = await botbye.validateRequest(options);

```

### Examples of botByeResponse:

#### Bot detected:

```json
{
  "reqId": "f77b2abd-c5d7-44f0-be4f-174b04876583",
  "result": {
    "isAllowed": false
  },
  "error": null
}
```

#### Bot not detected:

```json
{
  "reqId": "f77b2abd-c5d7-44f0-be4f-174b04876583",
  "result": {
    "isAllowed": true
  },
  "error": null
}
```

#### Ban by rule:

```json
{
  "reqId": "f77b2abd-c5d7-44f0-be4f-174b04876583",
  "result": {
    "isAllowed": false
  },
  "error": {
    "message": "Banned by rule: ban by country"
  }
}
```

#### Invalid serverKey:

```json
{
  "reqId": "f77b2abd-c5d7-44f0-be4f-174b04876583",
  "result": null,
  "error": {
    "message": "[BotBye] Bad Request: Invalid Server Key"
  }
}
```

#### 4. Full code example

```javascript
const botbye = require('botbye-node-core')

botbye.init({
    serverKey: 'MY_SERVER_KEY'
});

...

const handler = async (req, res) => {
    const botbyeToken = req.headers['BotBye-Token']; // get token from header or any place you store it

    const headers = Object.entries(req.headers);

    const requestInfo = {
        'request_uri': req.uri,
        'request_method': req.method,
        'remote_addr': req.remoteAddress,
    }

    const options = {
        token: botbyeToken,
        headers,
        requestInfo,
    }

    const botByeResponse = await botBye.validateRequest(options);

    const isAllowed = botByeResponse.result?.isAllowed ?? true;

    res.statusCode = isAllowed ? 200 : 403;
    res.end();
}

...


```
