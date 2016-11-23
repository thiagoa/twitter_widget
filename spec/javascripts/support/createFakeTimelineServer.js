import sinon from 'sinon';

const headers = { 'Content-Type': 'application/json' };

export default function createFakeTimelineServer() {
  const server = sinon.fakeServer.create();

  server.autoRespond = true;
  server.stubGet = function stubGet(url, { status = 200, body }) {
    this.respondWith('GET', url, [status, headers, JSON.stringify(body)]);
  };

  return server;
}
