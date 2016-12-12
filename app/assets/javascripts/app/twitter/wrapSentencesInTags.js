import { pipe } from 'lodash/fp';

function trimLines(text) {
  return text.split('\n').map(line => line.trim()).join('\n');
}

function toParagraph(line) {
  return line === '' ? '' : `<p>${line}</p>`;
}

function parseParagraphs(text) {
  return text.split('\n\n').map(toParagraph).join('');
}

export default pipe(trimLines, parseParagraphs);
