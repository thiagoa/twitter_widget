import { expect } from 'chai';
import fetchTimeline from 'app/twitter/fetchTimeline';
import createFakeTimelineServer from '../../support/createFakeTimelineServer';

describe('fetchTimeline', () => {
  let server;

  beforeEach(() => { server = createFakeTimelineServer(); });
  afterEach(() => { server.restore(); });

  const response = { tweets: [{ text: 'Hi!' }] };

  context('when timeline response is ok', () => {
    it('runs only then callback', () => {
      server.stubGet('/twitter_timeline/thiagoaraujos', { status: 200, body: response });

      const promise = fetchTimeline('thiagoaraujos').catch(() => 'notMe');

      return expect(promise).to.eventually.deep.equal(response);
    });

    it('chains then callbacks', () => {
      server.stubGet('/twitter_timeline/thiagoaraujos', { status: 200, body: response });

      const promise = fetchTimeline('thiagoaraujos').then((body) => {
        expect(body).to.deep.equal(response);
        return `${body.tweets[0].text} modified`;
      });

      return expect(promise).to.eventually.deep.equal('Hi! modified');
    });
  });

  context('when timeline response is not ok', () => {
    it('runs only the catch callback', () => {
      server.stubGet('/twitter_timeline/other', { status: 500, body: 'response' });

      const promise = fetchTimeline('other').catch(error => error.response);
      return expect(promise).to.eventually.include({ status: 500, data: 'response' });
    });
  });
});
