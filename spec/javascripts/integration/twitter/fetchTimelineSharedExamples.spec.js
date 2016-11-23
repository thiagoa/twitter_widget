import { expect } from 'chai';
import fetchTimeline from 'app/twitter/fetchTimeline';
import fetchTimelineJquery from 'app/twitter/fetchTimelineJquery';
import createFakeTimelineServer from '../../support/createFakeTimelineServer';

function runFetchTimelineExamples(testOpts) {
  let server;

  beforeEach(() => { server = createFakeTimelineServer(); });
  afterEach(() => { server.restore(); });

  const fetch = testOpts.fetch;
  const responseBody = { tweets: [{ text: 'Hi!' }] };

  context('when timeline response is ok', () => {
    it('runs the then callback', () => {
      server.stubGet('/twitter_timeline/thiagoaraujos', { status: 200, body: responseBody });

      const promise = fetch('thiagoaraujos').catch(() => 'notMe');
      return expect(promise).to.eventually.deep.equal(responseBody);
    });

    it('chains then callbacks', () => {
      server.stubGet('/twitter_timeline/thiagoaraujos', { status: 200, body: responseBody });

      const promise = fetch('thiagoaraujos').then(data => data);
      return expect(promise).to.eventually.deep.equal(responseBody);
    });
  });

  context('when timeline response is not ok', () => {
    it('runs the catch callback', () => {
      server.stubGet('/twitter_timeline/other', { status: 500, body: 'errorResp' });

      const promise = fetch('other').catch(error => error.response);
      return expect(promise).to.eventually.include({ status: 500, data: 'errorResp' });
    });
  });
}

describe('fetchTimeline', () => {
  runFetchTimelineExamples({ fetch: fetchTimeline });
});

describe('fetchTimelineJquery', () => {
  runFetchTimelineExamples({ fetch: fetchTimelineJquery });
});
