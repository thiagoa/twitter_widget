import parseOneTweet from 'app/twitter/parseOneTweet';
import renderOneTweet from 'app/twitter/renderOneTweet';
import fetchTimeline from 'app/twitter/fetchTimeline';

export default function mountComponent(opts) {
  const containerNode = opts.containerNode;

  function renderTweets(response) {
    const html = response
      .tweets
      .map(tweet => parseOneTweet(tweet))
      .map(tweet => renderOneTweet(tweet));

    containerNode.innerHTML = html;
  }

  fetchTimeline('thiagoaraujos').then(renderTweets);
}
