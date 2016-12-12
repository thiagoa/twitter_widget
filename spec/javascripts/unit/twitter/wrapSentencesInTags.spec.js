import { expect } from 'chai';
import wrapSentencesInTags from 'app/twitter/wrapSentencesInTags';

describe('wrapSentencesInTags', () => {
  context('when source text is blank', () => {
    it('renders an empty string', () => {
      const html = wrapSentencesInTags('  ');

      expect(html).to.equal('');
    });
  });

  context('when source text does not have newlines', () => {
    it('is parsed to a trimmed paragraph', () => {
      const html = wrapSentencesInTags('  Now we are talking  ');

      expect(html).to.equal('<p>Now we are talking</p>');
    });
  });

  context('when source text has two chunks joined by two newlines', () => {
    it('chunks around are parsed to trimmed paragraphs', () => {
      const html = wrapSentencesInTags('Hey!  \n\nNow we are talking');

      expect(html).to.equal('<p>Hey!</p><p>Now we are talking</p>');
    });
  });

  context('when source text has three subsequent newlines', () => {
    it('chunks around two newlines are parsed to trimmed paragraphs', () => {
      const html = wrapSentencesInTags('Hey!  \n\n\nNow we are talking');

      expect(html).to.equal('<p>Hey!</p><p>\nNow we are talking</p>');
    });
  });

  context('when source text has interleaved newlines between parts', () => {
    it('parses paragraphs correctly', () => {
      const html = wrapSentencesInTags(
        "Hey!\n\nDon't forget to have your meal\n\nYour mother\n"
      );

      expect(html).to.equal(
        '<p>Hey!</p>' +
        "<p>Don't forget to have your meal</p>" +
        '<p>Your mother\n</p>'
      );
    });
  });
});
