// Stands in for the Outreach PostgREST endpoint during end-to-end runs.
// GET /__inquiries returns what was received; an email starting with
// "fail@" is refused so the error path can be exercised.
import { createServer } from "node:http";

const received = [];

createServer((request, response) => {
  if (request.method === "GET" && request.url === "/__inquiries") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(received));
    return;
  }

  if (request.method === "POST" && request.url === "/rest/v1/rpc/submit_inquiry") {
    let body = "";
    request.on("data", (chunk) => (body += chunk));
    request.on("end", () => {
      const { p } = JSON.parse(body);
      if (p.email.startsWith("fail@")) {
        response.writeHead(400).end('{"message":"rate_limited"}');
        return;
      }
      received.push({ ...p, profile: request.headers["content-profile"], apikey: request.headers.apikey });
      response.writeHead(204).end();
    });
    return;
  }

  response.writeHead(200).end("ok");
}).listen(3101, "127.0.0.1");
