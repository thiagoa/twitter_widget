import { expect } from 'chai';
import parseTweetMentions from 'app/twitter/parseTweetMentions';

describe('parseTweetMentions', () => {
  context('with no mentions', () => {
    it('returns an empty string', () => {
      const html = parseTweetMentions({ text: '', mentions: [] });

      expect(html).to.equal('');
    });
  });

  context('when having one mention', () => {
    it('transforms the mention into an anchor tag', () => {
      const text = 'Hey @dude! How are you doing?';
      const mentions = ['dude'];

      const html = parseTweetMentions({ text, mentions });

      expect(html).to.equal(
        'Hey <a href="#" data-js-mention>@dude</a>! How are you doing?'
      );
    });
  });

  context('when having two mentions', () => {
    it('transforms all mentions into anchor tags', () => {
      const text = 'Released by @dude under @yow supervision';
      const mentions = ['dude', 'yow'];

      const html = parseTweetMentions({ text, mentions });

      expect(html).to.equal(
        'Released by <a href="#" data-js-mention>@dude</a> ' +
        'under <a href="#" data-js-mention>@yow</a> supervision'
      );
    });
  });

  context('when having the same mention twice', () => {
    it('transforms both mentions into the same anchor tag', () => {
      const text = '@dude Watch out, @dude!';
      const mentions = ['dude'];

      const html = parseTweetMentions({ text, mentions });

      expect(html).to.equal(
        '<a href="#" data-js-mention>@dude</a> Watch out, ' +
        '<a href="#" data-js-mention>@dude</a>!'
      );
    });
  });

  context('when a mention is surrounded by non whitespace chars on the left', () => {
    it('is not parsed as a mention', () => {
      const text = 'Email @dude at chief@dudecooking.com';
      const mentions = ['dude'];

      const html = parseTweetMentions({ text, mentions });

      expect(html).to.equal(
        'Email <a href="#" data-js-mention>@dude</a> at chief@dudecooking.com'
      );
    });
  });

  context('when a mention is surrounded by non whitespace chars on the right', () => {
    it('is not parsed as a mention', () => {
      const text = '@dude "@prefix@dude" is not a valid ivar in Ruby';
      const mentions = ['dude'];

      const html = parseTweetMentions({ text, mentions });

      expect(html).to.equal(
        '<a href="#" data-js-mention>@dude</a> ' +
        '"@prefix@dude" is not a valid ivar in Ruby'
      );
    });
  });
});
