import { expect } from 'chai';
import mountComponent from 'app/twitter/mountComponent';
import createFakeTimelineServer from '../../support/createFakeTimelineServer';
import createFixture from '../../support/createFixture';

describe('mountComponent', () => {
  let fixture;
  let server;

  beforeEach(() => {
    fixture = createFixture({ html: '<div data-js-tweets></div>' });
    server = createFakeTimelineServer();
  });

  afterEach(() => {
    fixture.destroy();
    server.restore();
  });

  const responseBody = {
    status: 'ok',
    tweets: [
      {
        created_at: '2016-01-01T00:00:00.000-03:00',
        text: 'Hi @dude!',
        mentions: ['dude'],
      },
      {
        created_at: '2016-01-02T03:05:05.000-03:00',
        text: 'Pizza!',
        mentions: [],
      },
    ],
  };

  it('renders an initial timeline', (done) => {
    server.stubGet('/twitter_timeline/thiagoaraujos', { status: 200, body: responseBody });

    mountComponent({ containerNode: fixture });

    setTimeout(() => {
      const tweets = fixture.querySelectorAll('.tweet > p');

      expect(tweets).to.have.length(2);
      expect(tweets[0].textContent).to.equal('Hi @dude!');
      expect(tweets[1].textContent).to.equal('Pizza!');

      done();
    }, 50);
  });
});
