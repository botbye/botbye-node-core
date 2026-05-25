# @botbye/node-core

[BotBye!](https://botbye.com) core module for Node.js — the low-level building block used by all BotBye framework integrations.

Use this package when no framework-specific integration is available for your environment, or when you need full control over how request information is passed to the SDK.

For most use cases, prefer a framework-specific package:

- [`@botbye/express`](https://www.npmjs.com/package/@botbye/express) — Express
- [`@botbye/fastify`](https://www.npmjs.com/package/@botbye/fastify) — Fastify
- [`@botbye/node-http`](https://www.npmjs.com/package/@botbye/node-http) — Node.js `http` module
- [`@botbye/cloudflare-worker`](https://www.npmjs.com/package/@botbye/cloudflare-worker) — Cloudflare Workers
- [`@botbye/nextjs`](https://www.npmjs.com/package/@botbye/nextjs) — Next.js
- [`@botbye/nuxt`](https://www.npmjs.com/package/@botbye/nuxt) — Nuxt

Full documentation: https://botbye.com/docs/server-side/node-js/core

## Install

```bash
npm i @botbye/node-core
```

```bash
yarn add @botbye/node-core
```

## Configuration

`@botbye/node-core` does not export `init` and `evaluate` directly. Call `moduleApiFactory` to create an SDK instance:

```javascript
import { moduleApiFactory } from "@botbye/node-core";
import { nodeHttpClient } from "@botbye/node-core/node-http-client";

const { init, evaluate, dev } = moduleApiFactory({
  httpClient: nodeHttpClient,
});

init({
  // Use your project server-key
  serverKey: "00000000-0000-0000-0000-000000000000",
});
```

Call `init` once at application startup, before any calls to `evaluate`.

### `moduleApiFactory` options

| Option | Type | Required | Description |
|---|---|---|---|
| `httpClient` | `THttpClient` | Yes | HTTP client used for API calls. See [HTTP clients](#http-clients). |
| `requestInfoExtractor` | `(request: R, global: TGlobalOptions) => TRequestInfo` | No | Converts a custom request object into request info, enabling `{ request: R }` in `evaluate`. See [Building a custom integration](#building-a-custom-integration). |
| `url` | `string` | No | Override BotBye API endpoint. Can also be set via `init`. |

### HTTP clients

Two built-in HTTP clients are available:

| Import path | When to use |
|---|---|
| `@botbye/node-core/node-http-client` | Standard Node.js environments (uses built-in `http`/`https`) |
| `@botbye/node-core/fetch-http-client` | Runtimes with the Fetch API (Deno, Bun, edge runtimes) |

If neither fits (custom proxy, special auth headers, retry logic), implement the `THttpClient` interface:

```typescript
import type { THttpClient } from "@botbye/node-core";

const myHttpClient: THttpClient = {
  type: "my-client",
  call(url, init) {
    const controller = new AbortController();
    const result = fetch(url, {
      method: init.method,
      headers: init.headers,
      body: JSON.stringify(init.body),
      signal: controller.signal,
    }).then((r) => r.text());
    return { result, abort: () => controller.abort() };
  },
};
```

### `init` options

| Option | Type | Required | Description |
|---|---|---|---|
| `serverKey` | `string` | Yes | Server key from your BotBye project |
| `url` | `string` | No | Override BotBye API endpoint (default: `https://verify.botbye.com`) |
| `logger.level` | `"error" \| "warn" \| "info" \| "debug" \| "log"` | No | Log level (default: `"info"`) |
| `logger.logger` | `TLogger` | No | Custom logger instance implementing `{ error, warn, info, debug, log }` |
| `timeouts.evaluate` | `number` | No | Timeout in milliseconds for each `evaluate` call |

## Building a custom integration

`requestInfoExtractor` lets you build a first-class integration for any framework not yet covered by an official package. It bridges the gap between a framework's native request object and the `TRequestInfo` shape that `evaluate` needs internally.

**What it does:**

When `requestInfoExtractor` is provided, `evaluate` gains a second calling form: instead of passing fields explicitly, you can pass `{ request: YourRequestObject }`. The extractor is called automatically to derive `ip`, `headers`, `requestMethod`, and `requestUri` from it.

```typescript
// Without requestInfoExtractor — explicit fields only
evaluate({ type: "validate", request: { ip, headers, requestMethod, requestUri, token } });

// With requestInfoExtractor — framework request object accepted directly
evaluate({ type: "validate", request: { request: req, token } });
```

Both forms remain valid side by side. Routes that already pass fields explicitly continue to work.

**Token handling:**

The extractor may also return a `token` field (e.g. extracted from a known header). If the caller also passes `token` in the event, the event's value takes precedence. This lets the extractor provide a sensible default while allowing per-call overrides.

**TypeScript:**

The generic parameter `R` on `moduleApiFactory<R>` flows through to the `evaluate` signature. Providing `requestInfoExtractor` is what makes the typed `{ request: R }` form valid:

```typescript
import { moduleApiFactory } from "@botbye/node-core";
import { nodeHttpClient } from "@botbye/node-core/node-http-client";
import type { Request } from "express";

const { init, evaluate, dev } = moduleApiFactory<Request>({
  httpClient: nodeHttpClient,
  requestInfoExtractor: (req, global) => {
    try {
      return {
        ip: req.ip ?? req.socket.remoteAddress ?? "0.0.0.0",
        headers: req.headers as Record<string, string>,
        requestMethod: req.method,
        requestUri: req.url,
        token: req.headers["x-botbye-token"] as string ?? null,
      };
    } catch {
      global.logger.warn("Failed to extract request info from Express request");
      return { ip: "0.0.0.0", headers: {} };
    }
  },
});

init({
  // Use your project server-key
  serverKey: "00000000-0000-0000-0000-000000000000",
});

// Now evaluate accepts Express Request directly
app.use(async (req, res, next) => {
  const result = await evaluate({
    type: "validate",
    request: {
      request: req,
      // "x-botbye-token" is an example — pass the token from wherever you store it
      token: req.headers["x-botbye-token"] as string,
    },
  });

  if (result.decision === "BLOCK") {
    return res.status(403).json({ error: "Forbidden" });
  }

  next();
});
```

The `global` argument passed to the extractor exposes `global.logger` — use it for warnings when the request object is malformed or unexpected.

## Usage

Call `evaluate` with an event object describing what you know about the request. It returns a promise that resolves to a decision.

There are three event types — `validate`, `risk`, and `full` — each suited for a different layer of your application.

Without `requestInfoExtractor`, all request fields must be provided explicitly — there is no framework request object to pass.

---

### `validate` — edge-level bot check

Use at the edge — API gateway, route handler, middleware — when you just want to know: **was this request made by a bot?** No user or domain context needed.

**Event fields:**

```typescript
{
  type: "validate";
  request:
    // Option A: custom request object — only available when requestInfoExtractor is configured
    | { request: R; token?: string | null }
    // Option B: explicit fields
    | { ip: string; headers: Record<string, string>; requestMethod?: string | null; requestUri?: string | null; token?: string | null };
  customFields?: Record<string, string>;
}
```

Pass IP and headers extracted from your runtime's request object. Option A — passing a framework request object directly — requires `requestInfoExtractor` to be configured in `moduleApiFactory`; see [Building a custom integration](#building-a-custom-integration). The `token` is a one-time token generated by the [BotBye client-side SDK](https://botbye.com/docs/client-side/npm-module) that contains information about the user's device. Pass whatever the client sent; if no token is received, the decision will be `"BLOCK"` due to an invalid token.

```javascript
async function handleRequest(ip, headers, method, url, token) {
  const result = await evaluate({
    type: "validate",
    request: {
      ip,
      headers,
      requestMethod: method,
      requestUri: url,
      token,
    },
  });

  if (result.decision === "BLOCK") {
    return { status: 403 };
  }

  // proceed normally
}
```

---

### `risk` — domain-level risk scoring

Use inside services that already know the user: auth, payments, account management. The purpose shifts from "is this a bot?" to **"is something suspicious happening for this user?"** — credential stuffing, account takeover, account sharing, logins from a new geo.

**Event fields:**

```typescript
{
  type: "risk";
  request:
    // Option A: custom request object — only available when requestInfoExtractor is configured
    | { request: R }
    // Option B: explicit fields
    | { ip: string; headers?: Record<string, string>; requestMethod?: string | null; requestUri?: string | null; token?: string | null };
  event: {
    type: string;
    status: "ATTEMPTED" | "SUCCESSFUL" | "FAILED" | "UNKNOWN";
  };
  user: {
    accountId: string;
    username?: string | null;
    email?: string | null;
    phone?: string | null;
  };
  customFields?: Record<string, string>;
  botbyeResult?: string;
}
```

`event` and `user` are the key fields here — they define what action is being performed and who is performing it, which is what drives the risk score. `ip` is equally important: BotBye tracks which IPs access the account to detect patterns like account sharing, credential stuffing, and suspicious geo logins. Pass it directly as `{ ip }`, or pass a request object via Option A if `requestInfoExtractor` is configured — see [Building a custom integration](#building-a-custom-integration).

```javascript
// Inside an auth service, after a login attempt
async function onLoginAttempt({ ip, userId, email, loginSucceeded }) {
  const result = await evaluate({
    type: "risk",
    request: { ip },
    event: {
      type: "login",
      status: loginSucceeded ? "SUCCESSFUL" : "FAILED",
      // "SUCCESSFUL" | "FAILED" | "ATTEMPTED" | "UNKNOWN"
    },
    user: {
      accountId: userId,
      email,
    },
  });

  if (result.decision === "BLOCK") {
    // Lock account, trigger MFA, send alert, etc.
  }
}
```

#### Linking `validate` and `risk` events

When the same request is evaluated at two layers — for example, once at the edge (`type: "validate"`) and then again inside a domain service (`type: "risk"`) — BotBye can link both events and display them as a single event in the dashboard.

The `validate` response includes a `botbye_result` string. Pass it as `botbyeResult` in the subsequent `risk` call to establish the link:

```javascript
// Edge layer — validate the bot token
const edgeResult = await evaluate({
  type: "validate",
  request: {
    ip,
    headers,
    requestMethod: method,
    requestUri: url,
    token,
  },
});

// Pass edgeResult.botbye_result to your domain service however you like —
// a request header, a context object, a function argument, etc.
const edgeBotbyeResult = edgeResult.botbye_result;

// Domain service — risk scoring linked to the edge validation above
const riskResult = await evaluate({
  type: "risk",
  request: { ip },
  event: {
    type: "login",
    status: loginSucceeded ? "SUCCESSFUL" : "FAILED",
  },
  user: {
    accountId: userId,
    email,
  },
  botbyeResult: edgeBotbyeResult,
});
```

`botbye_result` is optional in the response — if it is absent, omit `botbyeResult` and the events will be recorded independently.

---

### `full` — edge check and domain scoring in one call

Use when you have all context at once: raw request, token, user, and event. A login endpoint is a typical example — it receives the HTTP request and immediately knows the user and outcome.

**Event fields:**

```typescript
{
  type: "full";
  request:
    // Option A: custom request object — only available when requestInfoExtractor is configured
    | { request: R; token?: string | null }
    // Option B: explicit fields
    | { ip: string; headers: Record<string, string>; requestMethod?: string | null; requestUri?: string | null; token?: string | null };
  event: {
    type: string;
    status: "ATTEMPTED" | "SUCCESSFUL" | "FAILED" | "UNKNOWN";
  };
  user: {
    accountId: string;
    username?: string | null;
    email?: string | null;
    phone?: string | null;
  };
  customFields?: Record<string, string>;
}
```

Equivalent to running `validate` and `risk` in a single call. Option A requires `requestInfoExtractor` — see [Building a custom integration](#building-a-custom-integration).

```javascript
async function handleLogin({ ip, headers, method, url, token, email, password }) {
  const user = await findUser(email);
  const loginSucceeded = user && (await checkPassword(user, password));

  const result = await evaluate({
    type: "full",
    request: {
      ip,
      headers,
      requestMethod: method,
      requestUri: url,
      token,
    },
    event: {
      type: "login",
      status: loginSucceeded ? "SUCCESSFUL" : "FAILED",
    },
    user: {
      accountId: user?.id ?? "unknown",
      email,
    },
  });

  if (result.decision === "BLOCK") {
    return { status: 403 };
  }

  // proceed normally
}
```

---

## Response

`evaluate` always returns a `Promise<TEvaluationResult>`:

```typescript
type TEvaluationResult =
  | {
      decision: "ALLOW" | "BLOCK" | "CHALLENGE";
      request_id: string;
      risk_score: number;
      scores: Record<string, number>;
      signals: string[];
      botbye_result?: string;
    }
  | {
      decision: "ALLOW";
      botbye_result?: string;
      error: { message: string };
    };
```

Check `result.decision` to decide how to handle the request:

- `"ALLOW"` — request appears legitimate, proceed normally
- `"BLOCK"` — bot or suspicious activity detected, block the request
- `"CHALLENGE"` — uncertain, consider issuing a CAPTCHA, MFA or additional verification step

When the response contains an `error` field, BotBye could not evaluate the request (e.g. invalid server key). In that case `decision` defaults to `"ALLOW"` so that a misconfiguration does not block real users — but you should monitor and fix the underlying error.

### Response examples

Blocked (bot detected):

```json
{
  "request_id": "f77b2abd-c5d7-44f0-be4f-174b04876583",
  "decision": "BLOCK",
  "risk_score": 0.95,
  "scores": { "bot": 0.95 },
  "signals": ["AutomationTool"]
}
```

Allowed:

```json
{
  "request_id": "f77b2abd-c5d7-44f0-be4f-174b04876583",
  "decision": "ALLOW",
  "risk_score": 0.05,
  "scores": { "bot": 0.05, "ato": 0.02 },
  "signals": []
}
```

Challenge:

```json
{
  "request_id": "f77b2abd-c5d7-44f0-be4f-174b04876583",
  "decision": "CHALLENGE",
  "risk_score": 0.65,
  "scores": { "bot": 0.65 },
  "signals": ["SuspiciousFingerprint"],
  "challenge": { "type": "captcha", "token": "..." }
}
```

Invalid `serverKey`:

```json
{
  "decision": "ALLOW",
  "error": { "message": "[BotBye] Bad Request: Invalid Server Key" }
}
```

## Advanced: multiple instances

Use `moduleApiFactory` to create independent SDK instances (useful when protecting multiple projects from one service):

```javascript
import { moduleApiFactory } from "@botbye/node-core";
import { nodeHttpClient } from "@botbye/node-core/node-http-client";

const sdkA = moduleApiFactory({ httpClient: nodeHttpClient });
const sdkB = moduleApiFactory({ httpClient: nodeHttpClient });

sdkA.init({
  // Use your project server-key
  serverKey: "00000000-0000-0000-0000-000000000000",
});

sdkB.init({
  // Use your project server-key
  serverKey: "11111111-1111-1111-1111-111111111111",
});
```

## Dev utilities

```javascript
import { moduleApiFactory } from "@botbye/node-core";
import { nodeHttpClient } from "@botbye/node-core/node-http-client";

const { dev } = moduleApiFactory({ httpClient: nodeHttpClient });

// Change log verbosity at runtime
dev.setLoggerLevel("debug"); // "error" | "warn" | "info" | "debug" | "log"
```

## Documentation

- Web: https://botbye.com/docs/server-side/node-js/core
- Markdown (for AI tools and agents): https://botbye.com/docs/server-side/node-js/core.md
