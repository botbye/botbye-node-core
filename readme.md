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
const validateRequest = botbye.init('MY_SERVER_KEY');
```

#### 3. Use `validateRequest` on handlers where you need bot protection

#### In validateRequest pass token, headers array, and requestInfo

```javascript

const headers = {
  'host': 'example.com',
  'some-header': 'value1, value2'
};

const requestInfo = {
  'request_uri': "/path",
  'request_method': "GET",
  'remote_addr': request.connection.remoteAddress, // User IP
}

const customFields = [
  'custom field 1 value',
  'custom field 2 value',
  'custom field 3 value',
]

/**
 * @param {String} botbyeToken - Token from client side
 * @param {Object} headers - Request headers enties
 * @param {Object} requestInfo - Request info object
 * @param optional {Array} customFields - Additional fields
 * @return {Promise} - botByeResponse promise
 */
const botByeResponse = await botbye.validateRequest(botbyeToken, headers, requestInfo, customFields);

```

### Examples of botByeResponse:

#### Bot detected:

```javascript
{
  reqId: 'f77b2abd-c5d7-44f0-be4f-174b04876583'
  result: {
    isBot: true
  }
,
  error: null
}
```

#### Bot not detected:

```javascript
{
  reqId: 'f77b2abd-c5d7-44f0-be4f-174b04876583'
  result: {
    isBot: false
  }
,
  error: null
}
```

#### Invalid serverKey:

```javascript
{
  reqId: 'f77b2abd-c5d7-44f0-be4f-174b04876583'
  result: null
  error: {
    message: `[BotBye] Bad Request: Invalid Server Key`
  }
}
```

#### 4. Full code example

```javascript
const botbye = require('botbye-node-core')

botbye.init('MY_SERVER_KEY');

...

const handler = async (req, res) => {
  const botbyeToken = req.headers['botbye-challenge']; // get token from header or any place you store it

  const headers = Object.entries(req.headers);

  const requestInfo = {
    'request_uri': req.uri,
    'request_method': req.method,
    'remote_addr': req.remoteAddress,
  }


  const botByeResponse = await botBye.validateRequest(botbyeToken, headers, requestInfo);

  const isBot = botByeResponse.result?.isBot;

  res.statusCode = isBot ? 403 : 200;
  res.end();
}

...


```
