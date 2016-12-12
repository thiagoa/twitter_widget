import { pipe } from 'lodash/fp';
import wrapSentencesInTags from 'app/twitter/wrapSentencesInTags';
import parseLineBreaks from 'app/twitter/parseLineBreaks';
import parseTweetMentions from 'app/twitter/parseTweetMentions';

const parseText = pipe(parseTweetMentions, wrapSentencesInTags, parseLineBreaks);

export default function parseOneTweet(tweet) {
  return Object.assign({}, tweet, { text: parseText(tweet) });
}
