import { expect } from 'chai';
import parseLineBreaks from 'app/twitter/parseLineBreaks';

describe('parseLineBreaks', () => {
  context('when source text is blank', () => {
    it('returns an empty string', () => {
      const html = parseLineBreaks('');

      expect(html).to.equal('');
    });
  });

  context('when source has newline characters', () => {
    it('is replaced with <br> tags', () => {
      const html = parseLineBreaks('Line 1\nLine 2\nLine 3');

      expect(html).to.equal('Line 1<br>Line 2<br>Line 3');
    });
  });
});
