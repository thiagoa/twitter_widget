import { expect } from 'chai';
import renderOneTweet from 'app/twitter/renderOneTweet';
import createFixture from '../../support/createFixture';

describe('renderOneTweet', () => {
  let fixture;

  beforeEach(() => { fixture = createFixture({ html: '<div id="fixture"></div>' }); });
  afterEach(() => { fixture.remove(); });

  it('transforms a tweet object into an HTML string', () => {
    const tweet = { created_at: '2016-01-01', text: '<p>Hi!</p>' };

    fixture.innerHTML = renderOneTweet(tweet);

    expect(fixture.querySelectorAll('.tweet > header').length).to.equal(1);
    expect(fixture.querySelectorAll('.tweet > header')[0].innerText).to.equal('2016-01-01');
    expect(fixture.querySelectorAll('.tweet > p').length).to.equal(1);
    expect(fixture.querySelectorAll('.tweet > p')[0].innerText).to.equal('Hi!');
  });
});
